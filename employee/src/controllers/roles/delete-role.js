module.exports = function makeDeleteRoleAction({
    InternalServerError,
    deleteRole
})
{
    return async function deleteRoleAction(req,res)
    {
        try{
            await deleteRole({ roleId:req.params.id });
            res.status(200).send({"Response":`${req.params.id} deleted role successfully`});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}