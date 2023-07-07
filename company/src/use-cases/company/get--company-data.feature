Feature: Get a particular Company

    Scenario Outline: Invalid or empty inputs then throw error for getting an Company.
    Given Enter CompanyId: '<CompanyId>' for get an Company
    When Try to get an Company
    Then Throw error: "<error>" with message: "<message>" while getting an Company
    

    Examples:
        |    CompanyId                              | error       | message                    |
        |                                           | ValidationError       | Validation error at getCompanyData :: ValidationError: \"companyId\" is required         |
        |  18691581-12ab-4a19-8572-0cc939787b       | ValidationError       | Validation error at getCompanyData :: ValidationError: \"companyId\" must be a valid GUID        |


    Scenario Outline: Valid inputs then getting the Company.
    Given Enter CompanyId: '<CompanyId>' for get an Company
    When Try to get an Company
    Then Got the Company: "<message>"
    

    Examples:
        | CompanyId                                 |  message           |
        | 18691581-12ab-4a19-8572-0cc939787b2b      |  '[{"company_id":"18691581-12ab-4a19-8572-0cc939787b2b","company_name":"New-AbcPvt"}]'        |
        | 78965412-12ab-4a19-8572-0cc939787b2b      | '[]'    |