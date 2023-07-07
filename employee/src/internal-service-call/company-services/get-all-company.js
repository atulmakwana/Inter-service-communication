module.exports = function makegetAllCompany({
    config,
    axios
})
{
    return async function getAllCompany()
    {
        const response = await axios.get( config.serviceEndpoints.company );
                
        return response;
    }
}