module.exports = function makegetEmployeeForCompany({
    Joi,  
    ValidationError,
    getDbEmployeeForCompany
})
{
    return async function getEmployeeForCompany({companyId})
    {
        try{
            const value =  validateInputData({companyId});
            return await getDbEmployeeForCompany({companyId:value.companyId});
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
        if (error) {
            throw new ValidationError("Validation error at getEmployeeForCompany :: "+error.message)
        }
        return value;
    }
}