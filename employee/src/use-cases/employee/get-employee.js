module.exports = function makegetEmployee({
    Joi,  
    ValidationError,
    getDbEmployee
})
{
    return async function getEmployee({employeeId})
    {
        try{
            const value =  validateInputData({employeeId});
            return await getDbEmployee({employeeId:value.employeeId});
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData({employeeId})
    {
        const schema = Joi.object({
            employeeId:Joi.string().uuid().required()
        });
        const {error,value} = schema.validate({employeeId});
        if (error) {
            throw new ValidationError("Validation error at getEmployee :: "+error.message)
        }
        return value;
    }
}