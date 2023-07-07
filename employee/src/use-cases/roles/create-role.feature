Feature: Creating a new role
    
    Scenario Outline: Invalid or empty inputs then throw error for creating role.
    Given Company name: "<companyName>", name: "<name>", permissions: "<permissions>" and Is Master:"<isMaster>"
    When Try to create a new role
    Then Throw error: "<error>" with message: "<message>" while creating a new role

    Examples:
        | companyName |  name       |  permissions              |  isMaster |   error           | message                            |
        |             | SessionRead |  '{"session.read":true}'  |  false    | ValidationError   | Validation error at createRole :: \"companyName\" is required      |
        | AbcPvt      |             |  '{"session.read":true}'  |  false    | ValidationError   | Validation error at createRole :: \"name\" is required      |
        | AbcPvt      | SessionRead |  ''                       |  false    | ValidationError   | Validation error at createRole :: \"permissions\" is required      |
        | AbcPvt      | SessionRead |  '{"session.read":true}'  |           | ValidationError   | Validation error at createRole :: \"isMaster\" is required      |
        | AbcPvt      | SessionRead |  '{"session.read":true}'  |    asdf   | ValidationError   | Validation error at createRole :: \"isMaster\" must be a boolean     |
        | AbcPvt2     | SessionRead |  '{"session.read":true}'  |  false    | ObjectNotFound   | There is no such company you are trying to get!!!     |


    Scenario Outline: Valid inputs then show message for creating a new role.
    Given Company name: "<companyName>", name: "<name>", permissions: "<permissions>" and Is Master:"<isMaster>"
    When Try to create a new role
    Then Show message: "<message>" while creating a new role

    Examples:
        | companyName |  name       |  permissions              |  isMaster | message                            |
        | AbcPvt      | SessionRead |  '{"session.read":true}'  |  false    | '[{"role_id":"88130013-3d74-4d33-bbfe-635f742c6bc9"}]'     |
        