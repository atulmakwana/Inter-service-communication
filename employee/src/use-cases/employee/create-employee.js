module.exports = function makecreateEmployee({
    Joi,  
    ValidationError,
    ObjectNotFoundError,
    ObjectAlreadyExistError,
    runProducer,
    createDbEmployee,
    getCopmanybyName,
    getDbEmployeebyEmail
})
{
    return async function createEmployee({employeeName,empDesignation,employeeEmail,companyName})
    {
        try{
            const  value  = await validateInputData({employeeName,empDesignation,employeeEmail,companyName});
            const isEmailExist = await getDbEmployeebyEmail({employeeEmail:value.employeeEmail});
            if(isEmailExist.length){
                throw new ObjectAlreadyExistError("Employee already exist with same email!!!");
            }
            
            const isCompanyExist = await getCopmanybyName({companyName:value.companyName });
            if(!isCompanyExist.length){
                throw new ObjectNotFoundError("There is no such company you are trying to register on!!!");
            }
            const empCompanyId = isCompanyExist[0].company_id;
            
            const result = await createDbEmployee({ employeeName:value.employeeName,empDesignation:value.empDesignation,employeeEmail:value.employeeEmail,empCompanyId});
            
            const data = { employeeEmail, Verification_URL : `http://localhost:3002/employee/verify/${result[0].employee_id}` };
            
            await runProducer({topic:'employeeCreated',data })
            
            return result;
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            employeeName:Joi.string().trim().min(5).required(),
            employeeEmail:Joi.string().trim().email().required(),
            empDesignation:Joi.string().trim().required(),
            companyName:Joi.string().trim().required()
        });

        const { error,value } = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at createEmployee :: "+error.message)
        }
        return value;
    }
}