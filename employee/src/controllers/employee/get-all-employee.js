module.exports = function makegetAllEmployeeAction({
    InternalServerError,
    getAllEmployee
})
{
    return async function getAllEmployeeAction(req,res)
    {
        try{
            const result = await getAllEmployee();
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