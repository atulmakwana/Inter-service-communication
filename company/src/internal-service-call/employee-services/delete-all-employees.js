module.exports = function makedeleteAllEmployeesbyCopmany({
    axios,
    config
})
{
    return async function deleteAllEmployeesbyCopmany({companyId})
    {
        const response = await axios.delete( `${config.serviceEndpoints.company}/company/${companyId}` );
        return response;
    }
}