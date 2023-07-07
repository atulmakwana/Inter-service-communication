module.exports = function makegetCompanyDataAction({
    InternalServerError,
    getCompanyData
})
{
    return async function getCompanyDataAction(req,res)
    {
        try{            
            const result = await getCompanyData({companyId:req.params.id});
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