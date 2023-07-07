module.exports = function makegetRoleByIdAction({
    InternalServerError,
    getRoleById
})
{
    return async function getRoleByIdAction(req,res)
    {
        try{
            const result = await getRoleById({ id:req.params.id });
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