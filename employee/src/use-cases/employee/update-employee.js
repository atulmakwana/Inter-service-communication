module.exports = function makeupdateEmployee({
    Joi,  
    ValidationError,
    ObjectNotFoundError,
    getEmployee,
    updateDbEmployee
})
{
    return async function updateEmployee({ data,employeeId })
    {
        try{
            const value = validateInputData({ employeeId });
            
            let res = await getEmployee({ employeeId:value.employeeId });
            if(res.length)
            {
                return await updateDbEmployee({ employeeId:value.employeeId, data });
            }
            throw new ObjectNotFoundError("No such employee is there, you are trying to update...");
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            employeeId:Joi.string().uuid().required(),
            // employeeName:Joi.string().trim().min(5).required(),
            // empDesignation:Joi.string().trim().required(),
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at updateEmployee "+error.message)
        }
        return value;
    }
}