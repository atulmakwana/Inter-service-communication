module.exports = function makeverifyEmployee({
    Joi,  
    ValidationError,
    verifyDbEmployee
})
{
    return async function verifyEmployee({employeeId})
    {
        try{
            const value = validateInputData({ employeeId });
            
            return await verifyDbEmployee({employeeId:value.employeeId});
        }
        catch(err){
            throw err;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            employeeId:Joi.string().uuid().required()
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at verifyEmployee "+error.message)
        }
        return value;
    }
}