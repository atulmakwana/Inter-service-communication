module.exports = function makeSessionMethods({
    connection,
    DatabaseError
})
{
    return Object.freeze({
        getDbSession,
        createDbSession,
        updateDbSessionExpiryTime,
        logoutDbEmployee,
        filterDbEmployee,
        getAllDbSession

    });
    async function createDbSession({sessionId,token,employeeId,expiryTime,ip,empGeoLocation,userAgent})
    {
        try {
            let result = await connection.query(`insert into "sessionLogs"(session_id,jwt_token,employee_id,expiry_time,ip,employee_location,device) values($1,$2,$3,$4,$5,$6,$7)`,[sessionId,token,employeeId,expiryTime,ip,empGeoLocation,userAgent]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at createDbSession":error})
        }
    }
    async function getDbSession({token})
    {
        try {
            const result=await connection.query( `select * from "sessionLogs" where jwt_token=($1)`,[token]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbSession":error})
        }
    }
    async function updateDbSessionExpiryTime({token,expiryTime})
    {
        try {
            const result = await connection.query( `update "sessionLogs" set expiry_time=($1) where jwt_token=($2)`,[expiryTime,token]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at updateDbSessionExpiryTime":error})
        }
    }
    async function logoutDbEmployee({sessionId})
    {
        try {
            return await connection.query( `delete from "sessionLogs" where session_id=($1);`,[sessionId]);
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at createDbSession":error})
        }
    }
    async function filterDbEmployee({ data })
    {
        try
        {
            const arr = Object.keys(data);
            let count=1,orderBy; 
            let valueArr=[];
            let query = `select * from "sessionLogs" where `;
            
            for(let key of arr){
                if(key!='orderBy'){
                    valueArr.push(data[key]);
                    query += `${key}=$${count++}   and `
                }else{
                    orderBy = data[key];
                }
            }
            query = query.slice(0,(query.length-6));
            if(orderBy){
                query += `order by ${orderBy} ;`
            }
            else{
                query += ';'
            }
            const result = await connection.query( query,valueArr );
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at filterDbEmployee":error})
        }
    }
    async function getAllDbSession()
    {
        try {
            const result=await connection.query( `select * from "sessionLogs"`);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getAllDbSession":error})
        }
    }
}