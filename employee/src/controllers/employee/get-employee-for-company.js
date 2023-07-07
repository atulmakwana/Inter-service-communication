module.exports = function makegetEmployeeForCompanyAction({
    InternalServerError,
    getEmployeeForCompany
})
{
    return async function getEmployeeForCompanyAction(req,res)
    {
        try{
            const result = await getEmployeeForCompany({companyId:req.params.id});
            res.status(200).send({"Response":result});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}