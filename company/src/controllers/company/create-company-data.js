module.exports = function makecreateCompanyDataAction({
    InternalServerError,
    createCompanyData
})
{
    return async function createCompanyDataAction(req,res)
    {
        try{
            const result = await createCompanyData({ companyName : req.body.name });
            res.status(201).send({"Response":result});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}