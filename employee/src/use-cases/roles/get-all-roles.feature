Feature: Get all roles.

  Scenario Outline: Try to get all roles, then it will give all the available role list.
    Given Get all the roles.
    When Try to get all roles.
    Then It will give roles list: "<roleDetails>"
    Then getAllRole function is called <getAllRole> time

    Examples: 
      |  getAllRole  | roleDetails              |
      |        1     | '[{"role_id":"93da2cda-e255-49b4-a001-dc7eb938786e","company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","name":"role222","permission":"{\\\"session.read\\\":true}","is_master":true}]'  |