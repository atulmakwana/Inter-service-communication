Feature: Employee logout

    Scenario Outline: Invalid or empty inputs then throw error for logout of an employee.
    Given Enter session id: "<sessionId>" to logout an employee
    When Try to logout an employee
    Then Throw error: "<error>" with message: "<message>" while logging out an employee
    

    Examples:
        | sessionId                           | error                 | message                    |
        |                                     | ValidationError       | Validation error at logoutEmployee \"sessionId\" is required         |
        |7c08cc2f-b148-4772-b062-b0859742cf   | ValidationError       | Validation error at logoutEmployee \"sessionId\" must be a valid GUID        |



    Scenario Outline: Valid inputs then logout the employee.
    Given Enter session id: '<sessionId>' to logout an employee
    When Try to logout an employee
    Then Show the logout message: "<message>"
    

    Examples:
        | sessionId                                   | message                                   |
        | 7c08cc2f-b148-4772-b062-b0859742cf7c        | Logged out the employee succesfully          |