module.exports = function makeloginEmployeeAction({
    InternalServerError,
    loginEmployee
})
{
    return async function loginEmployeeAction(req,res)
    {
        try{
            // const ip='223.196.172.139';
            // const ip = '103.217.84.112';
            const ip = '103.238.107.135';
            const result = await loginEmployee({employeeEmail:req.body.Email, ip,userAgent:req.headers['user-agent']});
            res.status(200).send({"Response":"Employee logged in success!","Token":result});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}