module.exports = function makeloginEmployee({
    Joi,  
    jwt,
    geoip,
    v1,
    ValidationError,
    ObjectNotFoundError,
    ForbiddenError,
    createDbSession,
    getEmployeebyEmail,
})
{
    return async function loginEmployee({employeeEmail,ip,userAgent})
    {
        try{
            const value =  validateInputData({employeeEmail,ip,userAgent});

            const isEmployeeVerified = await getEmployeebyEmail({employeeEmail:value.employeeEmail});
            if(!isEmployeeVerified.length){
                throw new ObjectNotFoundError("Error at loginEmployee :: There is no user with this email!!!")
            }
            if(!isEmployeeVerified[0].is_varified)
            {
                throw new ForbiddenError("Error at loginEmployee :: Please first verify the employee!!!")
            }

            let expiryTime = new Date();
            expiryTime.setHours(expiryTime.getHours()+1);
            expiryTime = expiryTime.getTime();

            const token = jwt.sign({employeeId:isEmployeeVerified[0].employee_id,expiryTime},"myKeyyy")

            const sessionId = v1();
            var geo = geoip.lookup(ip);
            const empGeoLocation = geo.city + " : " + geo.ll.join(',');

            await createDbSession({sessionId,token,employeeId:isEmployeeVerified[0].employee_id,expiryTime,ip,empGeoLocation,userAgent});

            return token;
        }
        catch(err){
            throw err;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            employeeEmail:Joi.string().trim().email().required(),
            ip:Joi.string().ip().required(),
            userAgent:Joi.string().trim().required()
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at loginEmployee "+error.message)
        }
        return value;
    }
}