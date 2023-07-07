Feature: Updating a role
    
    Scenario Outline: Invalid or empty inputs then throw error for updating role.
    Given Role id: "<roleId>", name: "<name>" and permissions: "<permissions>"
    When Try to update a role
    Then Throw error: "<error>" with message: "<message>" while updating a role

    Examples:
        | roleId                                   |  name     |  permissions               |   error           | message                            |
        |                                          | SessionRW |  '{"session.write":true}'  | ValidationError   | Validation error at updateRole :: \"roleId\" is required      |
        | 98130013-3d74-4d33-bbfe-635f742c6bc9     |           |  '{"session.write":true}'  | ValidationError   | Validation error at updateRole :: \"name\" is required      |
        | 98130013-3d74-4d33-bbfe-635f742c6bc9     | SessionRW |  ''                        | ValidationError   | Validation error at updateRole :: \"permissions\" is required      |
        | 98130013-3d74-4d33-bbfe-635f742c6b       | SessionRW |  '{"session.write":true}'  | ValidationError   | Validation error at updateRole :: \"roleId\" must be a valid GUID    |
        | 98130013-3d74-4d33-bbfe-635f742c6bc9     | SessionRW |  '{"session.write":true}'  | ObjectNotFound    | There is no such role exist!!!     |


    Scenario Outline: Valid inputs then show response for updating a new role.
    Given Role id: "<roleId>", name: "<name>" and permissions: "<permissions>"
    When Try to update a role
    Then Show response: "<response>" while updating role

    Examples:
        | roleId                                 |  name     |  permissions               | response                            |
        | 19dae2f0-101f-11ee-9cd5-b387fd628ab1   | SessionRW |  '{"session.write":true}'  | '[{"role_id":"19dae2f0-101f-11ee-9cd5-b387fd628ab1","company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","name":"sessionRW","permission":"{\\\"session.get\\\":true,\\\"session.update\\\":true,\\\"session.write\\\":true}","is_master":false}]'       |
        