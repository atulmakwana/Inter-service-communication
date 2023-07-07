module.exports = function makeDeleteMasterForCompanyAction({
    InternalServerError,
    deleteMasterForCompany
})
{
    return async function deleteMasterForCompanyAction(req,res)
    {
        try{
            await deleteMasterForCompany({ companyId:req.params.id });
            res.status(200).send({"Response":`Roles who have company id=${req.params.id}, deleted those role successfully`});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}