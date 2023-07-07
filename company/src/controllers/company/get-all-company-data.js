module.exports = function makegetAllCompanyDataAction({
    InternalServerError,
    getAllCompanyData
})
{
    return async function getAllCompanyDataAction(req,res)
    {
        try{
            let result = await getAllCompanyData();
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