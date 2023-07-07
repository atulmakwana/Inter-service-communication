Feature: Deleting a role by id
    
    Scenario Outline: Invalid or empty role id then throw error.
    Given Enter role Id: "<roleId>"
    When Try to delete role
    Then Throw error: "<error>" with message: "<message>" while deleting a role

    Examples:
        | roleId                            | error           | message                         |
        |                                        | ValidationError | Validation error at deleteRole :: \"roleId\" is required      |
        | 13130013-3d74-4d33-bbfe-635f742c6b     | ValidationError | Validation error at deleteRole :: \"roleId\" must be a valid GUID      |
        | 98130013-3d74-4d33-bbfe-635f742c6bc9   | ObjectNotFound  | There is no such role you are trying to delete!!!       |
        | 19dae2f0-101f-11ee-9cd5-b387fd628ab1   | Error           | There is only one master role, you are trying to delete!!!      |


    Scenario Outline: Valid roleId then delete the role.
    Given Enter role Id: "<roleId>"
    When Try to delete role
    Then Show message: "<message>" while deleting a role

    Examples:
        | roleId                                 |  message                         |
        | f685fab0-1014-11ee-8d79-57a8d370ad61   |  Deleted the role successfull  |
