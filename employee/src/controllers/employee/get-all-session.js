module.exports = function makegetAllSessionAction({
    InternalServerError,
    getAllSession,
})
{
    return async function getAllSessionAction(req,res)
    {
        try{
            const result = await getAllSession();
            res.status(200).send({"Response":result,}); 
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}