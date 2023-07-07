module.exports = function makedeleteEmployeeAction({
    InternalServerError,
    deleteEmployee
})
{
    return async function deleteEmployeeAction(req,res)
    {
        try{
            await deleteEmployee({ employeeId:req.params.id });
            res.status(200).send({"Response":`${req.params.id} deleted employee successfully`});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}