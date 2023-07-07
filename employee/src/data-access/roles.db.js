module.exports = function makeRolesMethods({
    connection,
    DatabaseError
})
{
    return Object.freeze({
        createDbRole,
        getDbRoleById,
        assignDbRole,
        deleteDbRole,
        getDbAllRole,
        getDbRoleForEmployee,
        updateDbRole,
        addDbPermission,
        getDbRoleByCompany,
        getDbMasterRole,
        deleteDbMasterForCompany
    });
    async function createDbRole({ companyId,name,permissions,isMaster })
    {
        try {
            let result = await connection.query(`insert into roles(company_id,name,permission,is_master) values($1,$2,$3,$4) returning role_id`,[companyId,name,permissions,isMaster]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at createDbRole":error})
        }
    }
    async function getDbRoleById({roleId})
    {
        try {
            const result=await connection.query( `select * from roles where role_id=$1`,[roleId]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbRoleById":error})
        }
    }
    async function assignDbRole({employeeId,roleId})
    {
        try {
            const result = await connection.query( `insert into employee_role(role_id,employee_id) values($1,$2)`,[roleId,employeeId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at assignDbRole":error})
        }
    }
    async function deleteDbRole({roleId})
    {
        try {
            return await connection.query( `delete from roles where role_id=($1);`,[roleId]);
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at createDbSession":error})
        }
    }
    async function getDbAllRole()
    {
        try {
            const result=await connection.query( `select * from roles`);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbAllRole":error})
        }
    }
    async function getDbRoleForEmployee({employeeId})
    {
        try {
            const result = await connection.query( `select * from employee_role where employee_id=$1`,[employeeId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at assignDbRole":error})
        }
    }
    async function updateDbRole({permissions,name,roleId})
    {
        try {
            const result = await connection.query( `update roles set (permission,name) = ($1,$2) where role_id=$3`,[permissions,name,roleId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at updateDbRole":error})
        }
    }
    async function addDbPermission({permissions,roleId})
    {
        try {
            const result = await connection.query( `update roles set permission=$1 where role_id=$2`,[permissions,roleId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at addDbPermission":error})
        }
    }
    async function getDbRoleByCompany({companyId})
    {
        try {
            const result = await connection.query( `select * from roles where company_id=$1 and is_master=true`,[companyId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbRoleByCompany":error})
        }
    }
    async function getDbMasterRole()
    {
        try {
            const result = await connection.query( `select * from roles where is_master=true`) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbMasterRole":error})
        }
    }
    async function deleteDbMasterForCompany({companyId})
    {
        try {
            return await connection.query( `delete from roles where company_id=$1`,[companyId]);
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at deleteDbMasterForCompany":error})
        }
    }
}