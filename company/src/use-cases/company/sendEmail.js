module.exports = function makesendEmail({
    nodemailer,
    config
})
{
    return async function sendEmail()
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
                from: EMAIL,
                subject: "Inter service communication",
                text: "Employee created successfully!",
                to: "vatsalpatel9393@gmail.com",
            });
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}