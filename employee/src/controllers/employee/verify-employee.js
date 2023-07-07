module.exports = function makeverifyEmployeeAction({
    InternalServerError,
    verifyEmployee
})
{
    return async function verifyEmployeeAction(req,res)
    {
        try{
            await verifyEmployee({employeeId:req.params.id});
            res.status(200).send({"Response":`Employee with id ${req.params.id} verified successfully!`});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}