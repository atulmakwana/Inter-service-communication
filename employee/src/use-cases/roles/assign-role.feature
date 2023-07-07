Feature: Assigning a role to an employee
    
    Scenario Outline: Invalid or empty inputs then throw error for assigning role.
    Given RoleId: "<roleId>" and EmployeeId: "<employeeId>"
    When Try to assign role to employee
    Then Throw error: "<error>" with message: "<message>" while assigning a role

    Examples:
        | roleId                               | employeeId                            | error             | message                            |
        |                                      | cdda38fb-d157-4bb2-bc7b-24166667fb20  | ValidationError   | Validation error at assignRole :: \"roleId\" is required      |
        | 0a756673-a6cb-4207-a1f7-1d0d4883a391 |                                       | ValidationError   | Validation error at assignRole :: \"employeeId\" is required  |
        | 98130013-3d74-4d33-bbfe-635f742c6bc9 | cdda38fb-d157-4bb2-bc7b-24166667fb20  | ObjectNotFound    | ERROR :: There is no such role!!!  |

    Scenario Outline: Valid inputs then show response for assigning role.
    Given RoleId: "<roleId>" and EmployeeId: "<employeeId>"
    When Try to assign role to employee
    Then Show response: "<response>" while assigning a role

    Examples:
        | roleId                               | employeeId                            | response     |
        | 0a756673-a6cb-4207-a1f7-1d0d4883a391 | cdda38fb-d157-4bb2-bc7b-24166667fb20  | []           |
