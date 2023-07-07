module.exports = function makeDownloadFile({
    Storage
})
{
    return async function downloadFile({fileName})
    {
        try {
            const gcs = new Storage({
                projectId: projectId,
                keyFilename: keyFilename,
            });
    
            const bucketName = projectId;
            const destFilename = '../../public/downloads/';
    
            await gcs
                .bucket(bucketName)
                .file(fileName)
                .download({
                    destination: destFilename
                });
            } 
        catch (error) {
            throw new Error(error.message)
        }
        
    }
}