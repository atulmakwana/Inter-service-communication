module.exports = function makegetAllRoleAction({
    InternalServerError,
    getAllRole
})
{
    return async function getAllRoleAction(req,res)
    {
        try{
            const result = await getAllRole();
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