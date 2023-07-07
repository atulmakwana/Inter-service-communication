module.exports = function makegetCompanybyName({
    Joi, 
    ValidationError,
    ObjectNotFoundError,
    getDbCompanybyName
})
{
    return async function getCompanybyName({companyName})
    {
        try{
            const value =  await validateInputData({companyName});
            const result = await getDbCompanybyName({companyName:value.companyName});
            console.log(result);
            if(!result.length){
                throw new ObjectNotFoundError("There is no such company with name")
            }
            return result;
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData({companyName})
    {
        const schema = Joi.object({
            companyName:Joi.string().min(5).required()
        });
        const {error,value} = schema.validate({companyName});
        if (error) {
            throw new ValidationError("Validation error at getCompanybyName :: "+error.message)
        }
        return value;
    }
}