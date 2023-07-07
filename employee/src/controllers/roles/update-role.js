module.exports = function makeupdateRoleAction({
    InternalServerError,
    updateRole
})
{
    return async function updateRoleAction(req,res)
    {
        try{
            await updateRole({ 
                roleId:req.body.id,
                name:req.body.name,
                permissions:JSON.stringify(req.body.permissions),
            });
            res.status(200).send({"Response":"Update successFull"});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}