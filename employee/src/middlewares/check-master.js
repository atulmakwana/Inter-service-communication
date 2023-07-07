const jwt = require('jsonwebtoken');
const { role } = require('../use-cases');

module.exports = async function checkPermission(req, res, next)
{
    try {
        const accessToken = req.header('accessToken');
        const data=jwt.verify(accessToken,"myKeyyy")
        const employeeId = data.employeeId;
                
        const roleArr  = await role.getRoleForEmployee({ employeeId });
        
        var isMaster;
        for(const roles of roleArr)
        {
            const [ item ] = await role.getRoleById({ roleId:roles.role_id });
            
            if(item.is_master){
                isMaster=true;
                break;
            }
        }
        if(!isMaster){
            throw new Error(`Employee ${employeeId} is not a Master!!!`)
        }
        
        next();
    } 
    catch (error) {
        res.status(400).send({Error:"Error while checking Master :: "+error});
    }
}