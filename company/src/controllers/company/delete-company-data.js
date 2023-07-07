module.exports = function makedeleteCompanyDataAction({
    InternalServerError,
    deleteCompanyData
})
{
    return async function deleteCompanyDataAction(req,res)
    {
        try{            
            await deleteCompanyData({ companyId : req.params.id});
            res.status(200).send({"Response":`Company with id ${req.params.id} deleted successfull.`});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}