module.exports = function makeAssignRoleAction({
    InternalServerError,
    assignRole
})
{
    return async function assignRoleAction(req,res)
    {
        try{
            const result = await assignRole({ 
                employeeId:req.body.employeeId,
                roleId:req.body.roleId 
            });
            res.status(200).send({"Response":"Role assigned successfully"});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}