module.exports = function makeUploadFileAction({
    InternalServerError,
    uploadFile
})
{
    return async function uploadFileAction(req,res)
    {
        try{            
            const result = await uploadFile({ fileName:req.file.filename });
            res.status(200).send({"Response":"File uploaded successfully",result});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}