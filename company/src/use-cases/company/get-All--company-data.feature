Feature: Get all company.

  Scenario Outline: Try to get all company, then it will give all the company list.
    Given Get all company data.
    When Try to get all company.
    Then It will give company list: "<companydetail>"
    Then getAllCompanyData function will call <getAllCompanyData>  times

    Examples: 
      | getAllCompanyData | companydetail              |
      |            1      | '[{ "company_id": "18691581-12ab-4a19-8572-0cc939787b2b", "company_name": "RapidOps3" }, { "company_id": "31418924-77de-4d55-a744-04a08ba1d59a","company_name": "New-AbcdPvt" }]' |
