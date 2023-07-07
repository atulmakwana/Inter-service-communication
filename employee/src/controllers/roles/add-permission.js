module.exports = function makeaddPermissionAction({
    InternalServerError,
    addPermission
})
{
    return async function addPermissionAction(req,res)
    {
        try{
            await addPermission({ 
                roleId:req.body.id,
                permissions:req.body.permissions,
            });
            res.status(200).send({"Response":"Permission added successFull"});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}