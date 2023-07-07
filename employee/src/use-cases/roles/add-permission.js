module.exports = function makeaddPermission({
    Joi,
    ValidationError,
    ObjectNotFoundError,
    getDbRoleById,
    addDbPermission,
}){
    return async function addPermission({ roleId,permissions })
    {
        try 
        {
            const value = await validateInputData({roleId});

            const [result] = await getDbRoleById({roleId});
           
            if(!result){
                throw new ObjectNotFoundError("ERROR :: There is no such role!!!")
            }
            let params = JSON.parse(result.permission);
            for(const key in permissions)
            {
                params[key]=permissions[key]
            }

            return await addDbPermission({ roleId:value.roleId,permissions:params });
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
            throw new ValidationError("Validation error at addPermission :: "+error.message)
        }
        return value;
    }
}