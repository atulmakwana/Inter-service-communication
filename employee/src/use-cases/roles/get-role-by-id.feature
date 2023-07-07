Feature: Get a particular role

    Scenario Outline: Invalid or empty inputs then throw error for getting an role.
    Given Enter roleId: '<roleId>' to get a role
    When Try to get a role
    Then Throw error: "<error>" with message: "<message>" while getting a role
    

    Examples:
        |    roleId                              | error       | message                    |
        |                                            | ValidationError       | Validation error at getRoleById :: \"roleId\" is required         |
        |    d59c8758-d4db-4fb8-a4ce-f1d81c6516d     | ValidationError       | Validation error at getRoleById :: \"roleId\" must be a valid GUID    |


    Scenario Outline: Valid inputs then getting the role.
    Given Enter roleId: '<roleId>' to get a role
    When Try to get a role
    Then Got the role: "<roleDetail>"
    

    Examples:
        | roleId                                  |  roleDetail           |
        | d59c8758-d4db-4fb8-a4ce-f1d81c6516d5    | '[]'    |
        | 7c08cc2f-b148-4772-b062-b0859742cf7c    |  '[{"employee_id":"7c08cc2f-b148-4772-b062-b0859742cf7c","employee_name":"Atulll","employee_email":"atulmakwana4500@gmail.com","employee_designation":"Intern","emp_company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","is_varified":true}]'|