module.exports = function makegetEmployeebyEmail({
    Joi,  
    ValidationError,
    getDbEmployeebyEmail
})
{
    return async function getEmployeebyEmail({employeeEmail})
    {
        try{
            const value =  validateInputData({employeeEmail});
            return await getDbEmployeebyEmail({employeeEmail:value.employeeEmail});
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData({employeeEmail})
    {
        const schema = Joi.object({
            employeeEmail:Joi.string().trim().email().required()
        });
        const {error,value} = schema.validate({employeeEmail});
        if (error) {
            throw new ValidationError("Validation error at getEmployeebyEmail :: "+error.message)
        }
        return value;
    }
}