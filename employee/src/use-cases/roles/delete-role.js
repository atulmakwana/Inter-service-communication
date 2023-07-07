module.exports = function makeDeleteRole({
    Joi,
    ValidationError,
    ObjectNotFoundError,
    getDbRoleById,
    getDbRoleByCompany,
    getDbMasterRole,
    deleteDbRole,

}){
    return async function deleteRole({ roleId })
    {
        try 
        {
            const value = await validateInputData({ roleId });
            const [isRole] = await getDbRoleById({ roleId:value.roleId });
            if(!isRole){
                throw new ObjectNotFoundError("There is no such role you are trying to delete!!!")
            }
            if(isRole.is_master)
            {
                // const result = await getDbRoleByCompany({companyId:isRole.company_id});
                const result = await getDbMasterRole();
                if(result.length<=1){
                    throw new Error("There is only one master role, you are trying to delete!!!")
                }
            }

            return await deleteDbRole({ roleId:value.roleId });

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
            throw new ValidationError("Validation error at deleteRole :: "+error.message)
        }
        return value;
    }
}