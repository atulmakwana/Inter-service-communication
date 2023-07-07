module.exports = function makefilterEmployeeAction({
    InternalServerError,
    filterEmployee,
})
{
    return async function filterEmployeeAction(req,res)
    {
        try{
            const result = await filterEmployee({ data:req.body });
            res.status(200).send({"Response":result}); 
        }
        catch(err){
            if(!err.httpResponseCode){
                err = new InternalServerError(err.message)
            }
            res.status(err.httpResponseCode).send(err.message);
        }
    }
}