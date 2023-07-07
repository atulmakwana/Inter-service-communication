module.exports = function makeGetAllRole({
    getDbAllRole,
}){
    return async function getAllRole()
    {
        try 
        {
            return await getDbAllRole();
        } 
        catch (error) {
            throw error
        }
    }
}