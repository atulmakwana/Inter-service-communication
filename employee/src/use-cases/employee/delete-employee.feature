Feature: Delete a Employee

    Scenario Outline: Invalid or empty inputs then throw error for deleting employee.
    Given Enter employee id: "<employeeId>" to delete a employee
    When Try to delete a employee
    Then Throw error: "<error>" with message: "<message>" while deleting a employee
    

    Examples:
        | employeeId                             | error       | message                    |
        |                                        | ValidationError       | Validation error at deleteEmployee \"employeeId\" is required         |
        |  8758-d4db-4fb8-a4ce-f1d81c6516d5      | ValidationError       | Validation error at deleteEmployee \"employeeId\" must be a valid GUID         |
        | d59c8758-d4db-4fb8-a4ce-f1d81c6516d5   | ObjectNotFound        | No such employee is there, you are trying to delete...  |



    Scenario Outline: Valid inputs then delete the employee.
    Given Enter employee id: '<employeeid>' to delete a employee
    When Try to delete a employee
    Then Show message: "<message>"
    

    Examples:
        | employeeid                             | message                     |
        | 7c08cc2f-b148-4772-b062-b0859742cf7c   | Deleted the employee succesfully          |