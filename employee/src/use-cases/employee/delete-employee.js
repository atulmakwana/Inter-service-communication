module.exports = function makedeleteEmployee({
    Joi,  
    ValidationError,
    ObjectNotFoundError,
    getDbEmployee,
    deleteDbEmployee,
})
{
    return async function deleteEmployee({ employeeId })
    {
        try{
            const value = await validateInputData({ employeeId });
            
            const res = await getDbEmployee({ employeeId:value.employeeId });
            if(res.length)
            {
                return await deleteDbEmployee({ employeeId });
            }
            throw new ObjectNotFoundError("No such employee is there, you are trying to delete...");
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            employeeId:Joi.string().uuid().required()
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at deleteEmployee "+error.message)
        }
        return value;
    }
}