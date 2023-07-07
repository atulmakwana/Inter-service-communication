const jwt = require('jsonwebtoken');
const { role } = require('../use-cases');
const ForbiddenError = require('../exceptions/forbidden.error')
const permissionsObj = require('../utilities/enum');

module.exports = async function checkPermission(req, res, next)
{
    try {
        const accessToken = req.header('accessToken');
        const data=jwt.verify(accessToken,"myKeyyy")
        const employeeId = data.employeeId;
    
        const methodUrl = req.method +':'+req.url;
        const url = permissionsObj[methodUrl];
                
        const roleArr  = await role.getRoleForEmployee({ employeeId });
        
        var isPermission;
        for(const roles of roleArr)
        {
            const [ item ] = await role.getRoleById({ roleId:roles.role_id });
            
            if(item.is_master){
                isPermission=true;
                break;
            }

            const permissions = JSON.parse(item.permission);
            isPermission=permissions[url]
            if(permissions[url]){
                break;
            }
        }
        if(!isPermission){
            throw new ForbiddenError("Permission forbidden!!!")
        }
        
        next();
    } 
    catch (error) {
        const status = error.httpResponseCode || 400;
        res.status(status).send({Error:"Error while checking permissions :: "+error});
    }
}