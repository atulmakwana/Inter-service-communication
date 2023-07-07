module.exports = function makegetAllCompanyData({
    getAllDbCompanyData
})
{
    return async function getAllCompanyData()
    {
        try{
            return await getAllDbCompanyData();
        }
        catch(error){
            throw error;
        }
    }
}