module.exports = function makegetCompanybyId({
    config,
    axios
})
{
    return async function getCopmanybyName({ companyId })
    {
        const response = await axios.get( `${config.serviceEndpoints.company}/${ companyId }` );
                
        return response;
    }
}