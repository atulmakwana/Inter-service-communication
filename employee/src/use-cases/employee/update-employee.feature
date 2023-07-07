Feature: Update a employee

    Scenario Outline: Invalid or empty inputs then throw error.
    Given Enter employee id: '<employeeId>', name: '<employeeName>' and designation : '<empDesignation>' for updating a employee
    When Try to update a employee
    Then Throw an error: '<error>' with message: '<message>' while updating a employee

    Examples:
        |   employeeId                              |   employeeName  |  empDesignation  | error       | message                       |
        |                                           |   Atulll2       |    SE            | ValidationError       | Validation error at updateEmployee \"employeeId\" is required        |
        |   1c08cc2f-b148-4772-b062-b0859742cf7c    |   Atulll2       |    SE            | ObjectNotFound        | No such employee is there, you are trying to update...    |
        |   1c08cc2f-b148-4772-b062-b0859742cf7c    |   Atulll2       |    SE            | ObjectNotFound        | No such employee is there, you are trying to update...    |




    Scenario Outline: Valid inputs then update the employee.
    Given Enter employee id: '<employeeId>', name: '<employeeName>' and designation : '<empDesignation>' for updating a employee
    When Try to update a employee
    Then Updated the employee :: "<message>"
    

    Examples:
        |   employeeId                            |   employeeName  |  empDesignation  |   message          |
        |   23bdf750-0695-11ee-ba84-6b13c17d4a43  |   Atulll2       |    Intern        |   Update succesfull       |
