module.exports = function makelogoutEmployee({
    Joi,  
    ValidationError,
    logoutDbEmployee
})
{
    return async function logoutEmployee({ sessionId })
    {
        try{
            const value = validateInputData({ sessionId });
            
            return await logoutDbEmployee({ sessionId:value.sessionId });
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            sessionId:Joi.string().uuid().required()
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at logoutEmployee "+error.message)
        }
        return value;
    }
}