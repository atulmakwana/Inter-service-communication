Feature: Creating new company

    Scenario Outline: Empty inputs then throw error.
    Given company details name: "<companyName>" to create new company
    When Try to create new company
    Then Throw error: "<error>" with message: "<message>" while creating a company

    Examples:
        | companyName     | error           | message                                               |
        |                 | ValidationError           | Validation error at createCompanyData \"companyName\" is required                               |
        | Atul            | ValidationError           | Validation error at createCompanyData \"companyName\" length must be at least 5 characters long |
        | AbcPvt          | ObjectAlreadyExist        | ERROR :: There is already one company with same name, that you are trying to register on |



    
    Scenario Outline: Invalid company name input then throw error.
    Given company name : <companyName> to create new company
    When Try to create new company
    Then Throw error: "<error>" with message: "<message>" while creating a company

    Examples:
        | companyName     | error           | message                                               |
        |    1234         | ValidationError      | Validation error at createCompanyData \"companyName\" must be a string            |



    Scenario Outline: Valid inputs then create a company.
    Given company details name: "<companyName>" to create new company
    When Try to create new company
    Then It will create new company with details: "<newcompanyDetails>"

    Examples:
        | companyName      |  newcompanyDetails       |
        | RapidAbc         |  '[{"company_id":"0674675f-fbad-43bf-9b45-72fae0532b1d"}]'          |
