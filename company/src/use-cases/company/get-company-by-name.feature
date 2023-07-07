Feature: Get a particular Company by its name

    Scenario Outline: Invalid or empty inputs then throw error for getting an Company by name.
    Given Enter Company name: '<companyName>' to get a Company by name
    When Try to get a Company by name
    Then Throw error: "<error>" with message: "<message>" while getting a Company by name
    

    Examples:
        |    companyName      | error                 | message                    |
        |                     | ValidationError       | Validation error at getCompanybyName :: \"companyName\" is required         |
        |    Abcdef           | ObjectNotFound        | There is no such company with name   |


    Scenario Outline: Valid inputs then getting the Company by name.
    Given Enter Company name: '<companyName>' to get a Company by name
    When Try to get a Company by name
    Then Got the Company by its name: "<message>"
    

    Examples:
        |  companyName        |  message           |
        |  RapidAbc           |  '[{"company_id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","company_name":"AbcPvt"}]'        |
        