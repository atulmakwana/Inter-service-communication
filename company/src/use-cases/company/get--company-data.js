module.exports = function makegetCompanyData({
    Joi,  
    ValidationError,
    getDbCompanyData
})
{
    return async function getCompanyData({companyId})
    {
        try{
            const value =  await validateInputData({companyId});
            return await getDbCompanyData({companyId:value.companyId});
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData({companyId})
    {
        const schema = Joi.object({
            companyId:Joi.string().uuid().required()
        });
        const {error,value} = schema.validate({companyId});
        if(error) {
            throw new ValidationError("Validation error at getCompanyData :: "+error)
        }
        return value;
    }
}