module.exports = function makeDeleteRoleForCopmany({
    axios,
    config
})
{
    return async function deleteRoleForCopmany({companyId})
    {
        const response = await axios.delete( `${config.serviceEndpoints.role}/company/${companyId}` );       
        return response;
    }
}