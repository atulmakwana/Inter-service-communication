module.exports = function makegetEmployeeAction({
    InternalServerError,
    getEmployee
})
{
    return async function getEmployeeAction(req,res)
    {
        try{
            const result = await getEmployee({ employeeId:req.params.id });
            res.status(200).send({"Response":result});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}