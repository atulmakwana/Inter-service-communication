module.exports = function makeCreateRoleAction({
    InternalServerError,
    createRole,

})
{
    return async function createRoleAction(req,res)
    {
        try{
            const result = await createRole({
                companyName:req.body.companyName,
                name:req.body.name,
                permissions:JSON.stringify(req.body.permissions),
                isMaster:req.body.Master
            });
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