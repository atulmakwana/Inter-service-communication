module.exports = function makedeleteCompanyData({
    Joi, 
    ValidationError,
    ObjectNotFoundError,
    getDbCompanyData,
    deleteDbCompanyData,
    deleteRoleForCopmany,
    deleteAllEmployeesbyCopmany
})
{
    return async function deleteCompanyData({ companyId })
    {
        try{
            const value = await validateInputData({ companyId });
            const isCompanyExist = await getDbCompanyData({ companyId:value.companyId });
            if(!isCompanyExist.length){
                throw new ObjectNotFoundError("ERROR :: There is no such company, that you are trying to delete!!!");
            }
            const result = await deleteDbCompanyData({ companyId:value.companyId });
            /**
             * 
             * Calling following service because deleting company means there won't be any 
             * employee further more, so to delete all those employees belonging to this company
             * 
             */
            await deleteAllEmployeesbyCopmany({companyId:value.companyId});
            await deleteRoleForCopmany({companyId:value.companyId})
            
            return result;
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            companyId:Joi.string().uuid().required()
        });
        const {error,value} = schema.validate(data);

        if (error) {
            throw new ValidationError("Validation error at deleteCompanyData "+error.message)
        }
        return value;
    }
}