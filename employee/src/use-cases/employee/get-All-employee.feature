Feature: Get all employees.

  Scenario Outline: Try to get all employees, then it will give all the employees list.
    Given Get all the employees.
    When Try to get all employees.
    Then It will give employee list: "<employeedetail>"
    Then getAllEmployee function is called <getAllEmployee> time

    Examples: 
      |  getAllEmployee  | employeedetail              |
      |        1         | '[ { "employee_id": "7c08cc2f-b148-4772-b062-b0859742cf7c","employee_name": "Atulll","employee_email": "atulmakwana4500@gmail.com","employee_designation": "Intern","emp_company_id": "4c1e7d54-b379-4524-aa02-78f3ad8d494b","is_varified": true }]' |