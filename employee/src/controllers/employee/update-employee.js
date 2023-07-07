module.exports = function makeupdateEmployeeActio({
    InternalServerError,
    updateEmployee
})
{
    return async function updateEmployeeAction(req,res)
    {
        try{
            await updateEmployee({ data:req.body    ,employeeId:req.params.id });
            res.status(201).send({"Response":"Update successfull"});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}