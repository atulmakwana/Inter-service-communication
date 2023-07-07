module.exports = function makeAssignRole({
    Joi,
    ValidationError,
    ObjectNotFoundError,
    getDbRoleById,
    assignDbRole,
}){
    return async function assignRole({ employeeId,roleId })
    {
        try 
        {
            const value = await validateInputData({employeeId,roleId});
            const [isRole] = await getDbRoleById({ roleId:value.roleId });

            if(!isRole){
                throw new ObjectNotFoundError("ERROR :: There is no such role!!!")
            }
            return await assignDbRole({ employeeId:value.employeeId,roleId:value.roleId });
        } 
        catch (error) {
            throw error
        }
    }

    function validateInputData(data)
    {
        const schema = Joi.object({
            employeeId:Joi.string().uuid().required(),
            roleId:Joi.string().uuid().required(),
        });

        const { error,value } = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at assignRole :: "+error.message)
        }
        return value;
    }
}