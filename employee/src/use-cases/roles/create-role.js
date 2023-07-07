module.exports = function makeCreateRole({
    Joi,
    ValidationError,
    ObjectNotFoundError,
    createDbRole,
    getCopmanybyName
}){
    return async function createRole({ companyName,name,permissions,isMaster })
    {
        try 
        {
            const value = await validateInputData({companyName,name,permissions,isMaster});

            const isCompanyExist = await getCopmanybyName({companyName:value.companyName });
            if(!isCompanyExist.length){
                throw new ObjectNotFoundError("There is no such company you are trying to get!!!");
            }
            const companyId = isCompanyExist[0].company_id;

            return await createDbRole({ companyId,name:value.name,permissions,isMaster:value.isMaster});
        } 
        catch (error) {
            throw error
        }
    }

    function validateInputData(data)
    {
        const schema = Joi.object({
            companyName:Joi.string().trim().required(),
            name:Joi.string().trim().required(),
            permissions:Joi.string().required(),
            isMaster:Joi.boolean().required(),
        });

        const { error,value } = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at createRole :: "+error.message)
        }
        return value;
    }
}