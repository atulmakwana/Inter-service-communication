Feature: Delete a company

    Scenario Outline: Invalid or empty inputs then throw error for deleting company.
    Given Enter company id: "<companyId>" to delete a company
    When Try to delete a company
    Then Throw error: "<error>" with message: "<message>" while deleting a company
    

    Examples:
        | companyId                             | error       | message                    |
        |                                       | ValidationError       | Validation error at deleteCompanyData \"companyId\" is required         |
        | 78965412-12ab-4a19-8572-0cc939787b    | ValidationError       | Validation error at deleteCompanyData \"companyId\" must be a valid GUID         |
        | 78965412-12ab-4a19-8572-0cc939787b2b  | ObjectNotFound        | ERROR :: There is no such company, that you are trying to delete!!!         |



    Scenario Outline: Valid inputs then delete the company.
    Given Enter company id: '<companyid>' to delete a company
    When Try to delete a company
    Then Show message: "<message>"
    

    Examples:
        | companyid                                   | message                                  |
        | 18691581-12ab-4a19-8572-0cc939787b2b        | Deleted the company succesfully          |