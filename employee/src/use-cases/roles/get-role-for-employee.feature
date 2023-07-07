Feature: Get all roles of an employee

    Scenario Outline: Invalid or empty inputs then throw error for getting all role of employee
    Given Enter employeeId: '<employeeId>' to get all roles of an employee
    When Try to get all roles of an employee
    Then Throw error: "<error>" with message: "<message>" while getting all roles of an employee
    

    Examples:
        |    employeeId                              | error       | message                    |
        |                                            | ValidationError       | Validation error at getRoleForEmployee :: \"employeeId\" is required         |
        |    d59c8758-d4db-4fb8-a4ce-f1d81c6516d     | ValidationError       | Validation error at getRoleForEmployee :: \"employeeId\" must be a valid GUID    |


    Scenario Outline: Valid inputs then getting the role.
    Given Enter employeeId: '<employeeId>' to get all roles of an employee
    When Try to get all roles of an employee
    Then Got all the roles of employee: "<detail>"
    

    Examples:
        | employeeId                              |  detail           |
        | 7c08cc2f-b148-4772-b062-b0859742cf7c    |  success |