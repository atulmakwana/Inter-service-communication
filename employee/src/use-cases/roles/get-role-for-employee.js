module.exports = function makeGetRoleForEmployee({
    Joi,
    ValidationError,
    getDbRoleForEmployee,
}){
    return async function getRoleForEmployee({ employeeId })
    {
        try 
        {
            const value = await validateInputData({employeeId});
            return await getDbRoleForEmployee({ employeeId:value.employeeId});
        } 
        catch (error) {
            throw error
        }
    }

    function validateInputData(data)
    {
        const schema = Joi.object({
            employeeId:Joi.string().uuid().required(),
        });

        const { error,value } = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at getRoleForEmployee :: "+error.message)
        }
        return value;
    }
}