const jwt = require('jsonwebtoken');
const { sessionDb } = require('../data-access');
const { role } = require('../use-cases');
const permissions = require('../utilities/enum');
const AuthorizationFailedError = require('../exceptions/authorization-failed.error');

module.exports = async function authorizeEmployee(req, res, next)
{
    var employeeId;
    try {
        const accessToken = req.header('accessToken');
        
        if(!accessToken){
            throw new AuthorizationFailedError("Authentication token must required!!!")
        }
        const isAuthorized = await authorizeEmployee({accessToken});
        if(!isAuthorized){
            throw new AuthorizationFailedError("Please authenticate employee using a valid token!!!")
        }

        next();
    } 
    catch (error) {
        res.status(401).send({ERROR:"Authorization  Error :: "+error.message});
    }
    async function authorizeEmployee({accessToken})
    {
        const data=jwt.verify(accessToken,"myKeyyy")

        employeeId = data.employeeId;

        const [ session ] = await sessionDb.getDbSession({token:accessToken});

        if (!session || Date.now()>session.expiry_time) {
            throw new AuthorizationFailedError("Your session has been Expired")
        }
        let expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours()+1);
        expiryTime = expiryTime.getTime();

        const res = await sessionDb.updateDbSessionExpiryTime({token:accessToken,expiryTime})

        return true;
    }
}