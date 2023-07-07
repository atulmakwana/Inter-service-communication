module.exports = function makeEmployeeMethods({
    connection,
    DatabaseError
})
{
    return Object.freeze({
        createDbEmployee,
        deleteDbEmployee,
        getAllDbEmployee,
        updateDbEmployee,
        deleteDbEmployeeForCompany,
        getDbEmployeeForCompany,
        getDbEmployee,
        verifyDbEmployee,
        getDbEmployeebyEmail
    });
    async function createDbEmployee({employeeName,empDesignation,employeeEmail,empCompanyId})
    {
        try {  
            let result = await connection.query(`insert into employees(employee_name,employee_email,employee_designation,emp_company_id) values($1,$2,$3,$4) RETURNING employee_id`,[employeeName,employeeEmail,empDesignation,empCompanyId]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at createDbEmployee":error})
        }
    }
    async function deleteDbEmployee({employeeId})
    {
        try {  
            return await connection.query( `delete from employees where employee_id=($1);`,[employeeId]);
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at deleteDbEmployee":error})
        }
    }
    async function updateDbEmployee({ data,employeeId})
    {
        try 
        {  
            const entries = Object.entries(data);
            const mapArr = entries.map(([column,value]) => {
                let columnName;
                if(column=='Name'){
                    columnName='employee_name';
                }
                else if(column=='Designation'){
                    columnName='employee_designation'
                }
                else if(column=='Email'){
                    columnName='employee_email';
                }
                return  `${columnName} = '${value}'`
            });
            
            const values = mapArr.join(", ");
            
            const result = await connection.query( `UPDATE employees SET ${values} WHERE employee_id = '${$1}';` ,[employeeId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at updateDbEmployee":error})
        }
    }
    async function deleteDbEmployeeForCompany({companyId})
    {
        try {  
            return await connection.query( `delete from employees where emp_company_id=($1);`,[companyId],)
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at deleteDbEmployeeForCompany":error})
        }
    }
    async function getDbEmployeeForCompany({companyId})
    {
        try {  
            const result=await connection.query( `select * from employees where emp_company_id=($1)`,[companyId]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbEmployeeForCompany":error})
        }
    }
    async function getDbEmployee({employeeId})
    {
        try {  
            const result=await connection.query( `select * from employees where employee_id=($1)`,[employeeId]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbEmployee":error})
        }
    }
    async function getAllDbEmployee()
    {
        try {  
            const result=await connection.query( `select * from employees`);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getAllDbEmployee":error})
        }
    }
    async function getDbEmployeebyEmail({employeeEmail})
    {
        try {  
            const result=await connection.query( `select * from employees where employee_email= $1`,[employeeEmail]);
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbEmployeebyEmail":error})
        }
    }
    async function verifyDbEmployee({employeeId})
    {
        try {  
            const result = await connection.query( `update employees set is_varified='True' where employee_id = $1`,[employeeId]) ;
            return result.rows;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at verifyDbEmployee":error})
        }
    }
}