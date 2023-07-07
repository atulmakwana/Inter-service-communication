module.exports = function makeGetRoleById({
    Joi,
    ValidationError,
    getDbRoleById,
}){
    return async function getRoleById({ roleId })
    {
        try 
        {
            const value = await validateInputData({roleId});
            return await getDbRoleById({ roleId:value.roleId});
        } 
        catch (error) {
            throw error
        }
    }

    function validateInputData(data)
    {
        const schema = Joi.object({
            roleId:Joi.string().uuid().required(),
        });

        const { error,value } = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at getRoleById :: "+error.message)
        }
        return value;
    }
}