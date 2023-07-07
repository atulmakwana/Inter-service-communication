module.exports = function makeupdateCompanyData ({
    Joi, 
    ValidationError,
    ObjectAlreadyExistError,
    ObjectNotFoundError,
    getDbCompanyData,
    getDbCompanybyName,
    updateDbCompanyData
})
{
    return async function updateCompanyData ({ companyName,companyId })
    {
        try{
            const value = await validateInputData({ companyName,companyId });
            
            const result = await getDbCompanyData({companyId:value.companyId});
            if(!result.length)
            {
                throw new ObjectNotFoundError("No such company is there, you are trying to update...");
            }
            const isAlreadyCompanyName = await getDbCompanybyName({companyName:value.companyName});
            if(isAlreadyCompanyName.length)
            {
                throw new ObjectAlreadyExistError("There is already one company with same name, that you are trying to update on");
            }
            return await updateDbCompanyData({ companyId:value.companyId, companyName:value.companyName });
            
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            companyId:Joi.string().uuid().required(),
            companyName:Joi.string().trim().min(5).required()
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at updateCompanyData  "+error.message)
        }
        return value;
    }
}