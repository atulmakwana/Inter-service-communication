module.exports = function makeCompanyMethods({
    connection,
    DatabaseError
})
{
    return Object.freeze({
        createDbCompanyData,
        updateDbCompanyData,
        deleteDbCompanyData,
        getDbCompanyData,
        getAllDbCompanyData,
        getDbCompanybyName
    });
    async function createDbCompanyData({companyName})
    {
        try {
            const result = await connection.query(`insert into companies(company_name) values($1) RETURNING company_id`,[companyName]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at createDbCompanyData":error})
        }
    }
    async function updateDbCompanyData({companyName,companyId})
    {
        try {
            const result = await connection.query( `update companies set company_name=($1) where company_id=($2)`,[companyName,companyId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at updateDbCompanyData":error})
        }
    }
    async function deleteDbCompanyData({companyId})
    {
        try {
            const result = await connection.query( `delete from companies where company_id=($1);`,[companyId],)
            return result;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at deleteDbCompanyData":error})
        }
    }
    async function getDbCompanyData({companyId})
    {
        try {
            const result=await connection.query( `select * from companies where company_id=($1)`,[companyId]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbCompanyData":error})
        }
    }
    async function getDbCompanybyName({companyName})
    {
        try {
            const result=await connection.query( `select * from companies where company_name=($1)`,[companyName]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbCompanybyName":error})
        }
    }
    async function getAllDbCompanyData()
    {
        try {
            const result=await connection.query( `select * from companies`);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getAllDbCompanyData":error})
        }
    }
}