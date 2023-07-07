Feature: Update a company

    Scenario Outline: Invalid or empty inputs then throw error.
    Given Enter company id: '<companyId>', name: '<companyName>' for updating a company
    When Try to update a company
    Then Throw an error: '<error>' with message: '<message>' while updating a company

    Examples:
        |   companyId                             | companyName     | error       | message                       |
        |                                         |   Abcdfgh       | ValidationError       | Validation error at updateCompanyData  \"companyId\" is required        |
        |   18691581-12ab-4a19-8572-0cc939787b2b  |                 | ValidationError       | Validation error at updateCompanyData  \"companyName\" is required        |
        |   78965412-12ab-4a19-8572-0cc939787b2b  |  Abcdefgh       | ObjectNotFound      | No such company is there, you are trying to update...    |
        |   18691581-12ab-4a19-8572-0cc939787b2b  |  AbcPvt         | ObjectAlreadyExist   | There is already one company with same name, that you are trying to update on    |



    Scenario Outline: Invalid emmployee name input then throw error.
    Given Enter company id: '<companyId>', name: <companyName> for updating a company
    When Try to update a company
    Then Throw an error: '<error>' with message: '<message>' while updating a company

    Examples:
        |   companyId                               | companyName   | error       | message                       |
        |   18691581-12ab-4a19-8572-0cc939787b2b    |   12345       | ValidationError       | Validation error at updateCompanyData  \"companyName\" must be a string    |




    Scenario Outline: Valid inputs then update the company.
    Given Enter company id: '<companyId>', name: '<companyName>' for updating a company
    When Try to update a company
    Then Updated the company :: "<message>"
    

    Examples:
        |   companyId                             | companyName   |   message          |
        |   18691581-12ab-4a19-8572-0cc939787b2b  |  RapidAbc     |   Update succesfull       |
