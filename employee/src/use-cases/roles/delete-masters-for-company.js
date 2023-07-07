module.exports = function makedeleteMasterForCompany({
    Joi,
    ValidationError,
    deleteDbMasterForCompany
}){
    return async function deleteMasterForCompany({ companyId })
    {
        try 
        {
            const value = await validateInputData({ companyId });
            return await deleteDbMasterForCompany({ companyId:value.companyId });
        } 
        catch (error) {
            throw error
        }
    }

    function validateInputData(data)
    {
        const schema = Joi.object({
            companyId:Joi.string().uuid().required(),
        });

        const { error,value } = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at deleteMasterForCompany :: "+error.message)
        }
        return value;
    }
}