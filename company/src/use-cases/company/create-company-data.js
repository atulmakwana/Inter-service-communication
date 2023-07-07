module.exports = function makecreateCompanyData({
    Joi, 
    ValidationError,
    ObjectAlreadyExistError,
    getDbCompanybyName,
    createDbCompanyData
})
{
    return async function createCompanyData({companyName})
    {
        try{
            const value  = await validateInputData({companyName});

            const isCompanyAlreadyExist = await getDbCompanybyName({ companyName:value.companyName } );

            if( isCompanyAlreadyExist.length )
            {
                throw new ObjectAlreadyExistError("ERROR :: There is already one company with same name, that you are trying to register on");
            }

            return await createDbCompanyData({ companyName:value.companyName});
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            companyName:Joi.string().min(5).required()
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at createCompanyData "+error.message)
        }
        return value;
    }
}