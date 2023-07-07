module.exports = function makelogoutEmployeeAction({
    InternalServerError,
    logoutEmployee
})
{
    return async function logoutEmployeeAction(req,res)
    {
        try{
            await logoutEmployee({ sessionId:req.params.id });
            res.status(200).send({"Response":"Employee logged out success!",}); 
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}