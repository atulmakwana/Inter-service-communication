module.exports = function makefilterEmployee({
    filterDbEmployee,
})
{
    return async function filterEmployee({ data })
    {
        try{
            return await filterDbEmployee({ data });
        }
        catch(error){
            throw error;
        }
    }
}