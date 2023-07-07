module.exports = function makedeleteEmployeeForCompanyAction({
    InternalServerError,
    deleteEmployeeForCompany
})
{
    return async function deleteEmployeeForCompanyAction(req,res)
    {
        try{
            await deleteEmployeeForCompany({ companyId:req.params.id });
            res.status(200).send({"Response":`Deleted all employee for the company ${req.params.id}.`});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}