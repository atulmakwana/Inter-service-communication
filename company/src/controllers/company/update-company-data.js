module.exports = function makeupdateCompanyDataAction({
    InternalServerError,
    updateCompanyData
})
{
    return async function updateCompanyDataAction(req,res)
    {
        try{
            await updateCompanyData({ companyId:req.params.id, companyName : req.body.name });
            res.status(202).send({"Response":"Update Successfull"});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}