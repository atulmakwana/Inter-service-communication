Feature: Adding more permission in a existing role
    
    Scenario Outline: Invalid or empty roleId or permisions then throw error.
    Given RoleId: "<roleId>" and permissions: "<permissions>"
    When Try to add new permisions in existing role
    Then Throw error: "<error>" with message: "<message>" while adding permisions in a role

    Examples:
        | roleId                               |  permissions                     | error           | message                         |
        |                                      |  '{ "session.update":true }'     | ValidationError | Validation error at addPermission :: \"roleId\" is required      |
        | 98130013-3d74-4d33-bbfe-635f742c6b   |  '{ "session.update":true }'     | ValidationError | Validation error at addPermission :: \"roleId\" must be a valid GUID     |
        | 98130013-3d74-4d33-bbfe-635f742c6bc9 |  '{ "session.update":true }'     | ObjectNotFound  | ERROR :: There is no such role!!!     |


    Scenario Outline: Valid roleId and permisions then return empty array.
    Given RoleId: "<roleId>" and permissions: "<permissions>"
    When Try to add new permisions in existing role
    Then Show message: "<message>" while adding permisions in a role

    Examples:
        | roleId                               |  permissions                     |  message   |
        | 0a756673-a6cb-4207-a1f7-1d0d4883a391 |  '{ "session.update":true }'     |  []        |
