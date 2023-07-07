module.exports = function makesendEmail({
    config,
    nodemailer
})
{
    return async function sendEmail({employeeEmail,Verification_URL})
    {
        try{
            const EMAIL = config.EMAIL;
            const CLIENT_ID = config.CLIENT_ID;
            const CLIENT_SECRET = config.CLIENT_SECRET;
            const REFRESH_TOKEN = config.REFRESH_TOKEN;

            const transporter =  nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: EMAIL,
                    secure:false,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN
                }
            });
            
            const res=transporter.sendMail({
                subject: "Inter service communication",
                text: `Employee created successfully!
                
                ${Verification_URL}`,
                
                to: employeeEmail,
                from: EMAIL
            });
        }
        catch(err){
            throw err;
        }
    }
}