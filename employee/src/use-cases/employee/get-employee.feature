Feature: Get a particular employee

    Scenario Outline: Invalid or empty inputs then throw error for getting an employee.
    Given Enter employeeId: '<employeeId>' for get an employee
    When Try to get an employee
    Then Throw error: "<error>" with message: "<message>" while getting an employee
    

    Examples:
        |    employeeId                              | error       | message                    |
        |                                            | ValidationError       | Validation error at getEmployee :: \"employeeId\" is required         |
        |    d59c8758-d4db-4fb8-a4ce-f1d81c6516d     | ValidationError       | Validation error at getEmployee :: \"employeeId\" must be a valid GUID    |


    Scenario Outline: Valid inputs then getting the employee.
    Given Enter employeeId: '<employeeId>' for get an employee
    When Try to get an employee
    Then Got the employee: "<employeeDetail>"
    

    Examples:
        | employeeId                              |  employeeDetail           |
        | d59c8758-d4db-4fb8-a4ce-f1d81c6516d5    | '[]'    |
        | 7c08cc2f-b148-4772-b062-b0859742cf7c    |  '[{"employee_id":"7c08cc2f-b148-4772-b062-b0859742cf7c","employee_name":"Atulll","employee_email":"atulmakwana4500@gmail.com","employee_designation":"Intern","emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","is_varified":true}]'        |        
        