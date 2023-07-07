module.exports = function makeupdateRole({
    Joi,
    ValidationError,
    ObjectNotFoundError,
    getDbRoleById,
    updateDbRole,
}){
    return async function updateRole({ roleId,name,permissions })
    {
        try 
        {
            const value = await validateInputData({roleId,name,permissions});
            const [isRole] = await getDbRoleById({ roleId:value.roleId });

            if(!isRole){
                throw new ObjectNotFoundError("There is no such role exist!!!")
            }
            return await updateDbRole({ roleId:value.roleId,name:value.name,permissions:value.permissions });
        } 
        catch (error) {
            throw error
        }
    }

    function validateInputData(data)
    {
        const schema = Joi.object({
            roleId:Joi.string().uuid().required(),
            name:Joi.string().trim().required(),
            permissions:Joi.string().required(),
        });

        const { error,value } = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at updateRole :: "+error.message)
        }
        return value;
    }
}