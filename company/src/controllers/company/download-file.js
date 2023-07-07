module.exports = function makeDownloadFileAction({
    InternalServerError,
    downloadFile
})
{
    return async function downloadFileAction(req,res)
    {
        try{
            const result = await downloadFile({ fileName:req.params.file });
            res.status(200).send({"Response":"File downloaded successfully",result});
        }
        catch(error){
            if(!error.httpResponseCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpResponseCode).send(error.message);
        }
    }
}