Feature: Deleting Master for a deleting company
    
    Scenario Outline: Invalid or empty company id then throw error.
    Given Enter Company Id: "<companyId>"
    When Try to delete Master for deleting company
    Then Throw error: "<error>" with message: "<message>" deleting master for deleting company

    Examples:
        | companyId                            | error           | message                         |
        |                                      | ValidationError | Validation error at deleteMasterForCompany :: \"companyId\" is required      |
        | 98130013-3d74-4d33-bbfe-635f742c6b   | ValidationError | Validation error at deleteMasterForCompany :: \"companyId\" must be a valid GUID      |


    Scenario Outline: Valid companyId then delete Master.
    Given Enter Company Id: "<companyId>"
    When Try to delete Master for deleting company
    Then Show message: "<message>" while deleting Master for deleting company

    Examples:
        | companyId                              |  message                         |
        | 0a756673-a6cb-4207-a1f7-1d0d4883a391   |  Deleted the Master successfull  |
