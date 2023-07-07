module.exports = function makegetAllEmployee({
    getAllDbEmployee
})
{
    return async function getAllEmployee()
    {
        try{
            return await getAllDbEmployee();
        }
        catch(err){
            throw err;
        }
    }
}