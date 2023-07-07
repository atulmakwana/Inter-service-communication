Feature: Delete Employees for a company

    Scenario Outline: Invalid or empty inputs then throw error for deleting employee.
    Given Enter company id: "<companyId>" to delete employees for a company
    When Try to delete employees for a company
    Then Throw error: "<error>" with message: "<message>" while deleting employees for a company
    

    Examples:
        | companyId       | error                 | message                    |
        |                 | ValidationError       | Validation error at deleteEmployeeForCompany ::ValidationError: \"companyId\" is required         |



    Scenario Outline: Valid inputs then delete the employees for a company.
    Given Enter company id: "<companyId>" to delete employees for a company
    When Try to delete employees for a company
    Then Show message :: "<message>"
    

    Examples:
        | companyId                            | message                                    |
        | 8f5f1240-5544-49f4-a37b-326f64e56ead | Deleted the employees succesfully          |