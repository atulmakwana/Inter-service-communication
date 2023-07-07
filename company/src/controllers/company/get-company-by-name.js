module.exports = function makegetCompanybyNameAction({
    InternalServerError,
    getCompanybyName
})
{
    return async function getCompanybyNameAction(req,res)
    {
        try{
            const result = await getCompanybyName({companyName:req.params.name});
            res.status(200).send(result);
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}