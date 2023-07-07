Feature: Verify an Employee

    Scenario Outline: Invalid or empty inputs then throw error for verifying an employee.
    Given Enter employee id: "<employeeId>" to verify an employee
    When Try to verify an employee
    Then Throw error: "<error>" with message: "<message>" while verifing an employee
    

    Examples:
        | employeeId       | error       | message                    |
        |                  | ValidationError       | Validation error at verifyEmployee \"employeeId\" is required         |
        | 7c08cc2f-b148-4772-b062-b0859742cf | ValidationError       | Validation error at verifyEmployee \"employeeId\" must be a valid GUID        |



    Scenario Outline: Valid inputs then verify the employee.
    Given Enter employee id: '<employeeid>' to verify an employee
    When Try to verify an employee
    Then Show the verifying message: "<message>"
    

    Examples:
        | employeeid                                   | message                                   |
        | 7c08cc2f-b148-4772-b062-b0859742cf7c         | Verified the employee succesfully          |