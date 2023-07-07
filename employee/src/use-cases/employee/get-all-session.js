module.exports = function makegetAllSession({
    getAllDbSession
})
{
    return async function getAllSession()
    {
        try{
            return await getAllDbSession();
        }
        catch(err){
            throw err;
        }
    }
}