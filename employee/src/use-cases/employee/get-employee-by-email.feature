Feature: Get an employee by email.

  Scenario Outline: Invalid or empty inputs then throw error for getting an employee by email.
    Given Enter employeeEmail: '<employeeEmail>' to get an employee by email
    When Try to get an employee by email
    Then Throw error: "<error>" with message: "<message>" while getting an employee by email
    

    Examples:
        |    employeeEmail               | error                 | message                    |
        |                                | ValidationError       | Validation error at getEmployeebyEmail :: \"employeeEmail\" is required         |


  Scenario Outline: Valid inputs then get the employee by email.
    Given Enter employeeEmail: '<employeeEmail>' to get an employee by email
    When Try to get an employee by email
    Then It will give employee by email: "<employeedetail>"

    Examples: 
      |  employeeEmail              | employeedetail              |
      |  atulmakwana4500@gmail.com  | '[{"employee_id":"7c08cc2f-b148-4772-b062-b0859742cf7c","employee_name":"Atulll","employee_email":"atulmakwana4500@gmail.com","employee_designation":"Intern","emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","is_varified":true}]' |