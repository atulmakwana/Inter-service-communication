module.exports = function makeUploadFile({
    Storage
})
{
    return async function uploadFile({fileName})
    {
        try {
            const gcs = new Storage({
                projectId: projectId,
                keyFilename: keyFilename,
            })
    
            const bucketName = projectId;
            const folderName = 'newFolder';
            
            const filePath = `/src/public/uploads/${fileName}`;
            
            const bucket = gcs.bucket(bucketName);
            const res = await bucket.upload(filePath, {
                destination: `${folderName}/`
            });
    
            return res;
        } 
        catch (error) {
            throw new Error(error.message);
        }
    }
}