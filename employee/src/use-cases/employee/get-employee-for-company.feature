Feature: Get all employee for a particular company

    Scenario Outline: Invalid or empty inputs then throw error for getting employees for a particular company.
    Given Enter companyId: '<companyId>' to get all employee for a company
    When Try to get all employee for a company
    Then Throw error: "<error>" with message: "<message>" while getting all employee for a company
    
    Examples:
        |    companyId        | error       | message                    |
        |                     | ValidationError       | Validation error at getEmployeeForCompany :: \"companyId\" is required  |


    Scenario Outline: Valid inputs then get all the employee for that company.
    Given Enter companyId: '<companyId>' to get all employee for a company
    When Try to get all employee for a company
    Then Got all the employee for a company : "<employeeDetails>"
    

    Examples:
        | companyId                                   |  employeeDetails           |
        | 4c1e7d54-b379-4524-aa02-78f3ad8d494b        |  '[{"employee_id":"7c08cc2f-b148-4772-b062-b0859742cf7c","employee_name":"Atulll","employee_email":"atulmakwana4500@gmail.com","employee_designation":"Intern","emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","is_varified":true}]'        |        
        