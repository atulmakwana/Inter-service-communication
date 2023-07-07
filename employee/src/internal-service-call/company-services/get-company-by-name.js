module.exports = function makegetCompanyByName({
    config,
    axios,
    ObjectNotFoundError
})
{
    return async function getCopmanybyName({ companyName })
    {
        try {
            const response = await axios.get(`${config.serviceEndpoints.company}-by-name/${ companyName }` );
            return response.data;
            
        } catch (error) {
           if(error.response.data){
               throw new ObjectNotFoundError("ERROR :: There is no such company you are trying to register on!!!");
           }
            throw error;
        }
    }
}