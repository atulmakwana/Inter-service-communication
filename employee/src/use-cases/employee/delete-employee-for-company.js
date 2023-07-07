module.exports = function makedeleteEmployeeForCompany({
    Joi, 
    ValidationError,
    deleteDbEmployeeForCompany
})
{
    return async function deleteEmployeeForCompany({ companyId })
    {
        try{
            const value = await validateInputData({ companyId });
            
            return await deleteDbEmployeeForCompany({ companyId:value.companyId });
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
            throw new ValidationError("Validation error at deleteEmployeeForCompany ::"+error)
        }
        return value;
    }
}