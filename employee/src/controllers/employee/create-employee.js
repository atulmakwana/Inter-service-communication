module.exports = function makecreateEmployeeAction({
    InternalServerError,
    createEmployee
})
{
    return async function createEmployeeAction(req,res)
    {
        try{
            const result = await createEmployee({ employeeName:req.body.Name, empDesignation:req.body.Designation, employeeEmail:req.body.Email, companyName:req.body.CompanyName});
            res.status(201).send({"Response":result});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}