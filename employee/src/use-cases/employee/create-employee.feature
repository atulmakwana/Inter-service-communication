Feature: Creating new Employee

    Scenario Outline: Empty or invalid inputs then throw error.
    Given Employee details name: "<empname>", email: "<employeeEmail>", desgnation: "<empdesg>", company: "<companyName>" to create new employee
    When Try to create new employee
    Then Throw error: "<error>" with message: "<message>" while creating a employee

    Examples:
        | empname      | employeeEmail       | empdesg     | companyName  | error            | message                                                                                           |
        |              | atulll@gmail.com    | SE          | AbcPvt       | ValidationError  | Validation error at createEmployee :: \"employeeName\" is required                                |
        | Atulll       |                     | SE          | AbcPvt       | ValidationError  | Validation error at createEmployee :: \"employeeEmail\" is required                               |
        | Atulll       | atulll@gmail.com    |             | AbcPvt       | ValidationError  | Validation error at createEmployee :: \"empDesignation\" is required                              |
        | Atulll       | atulll@gmail.com    | SE          |              | ValidationError  | Validation error at createEmployee :: \"companyName\" is required                                |
        | Atul         | atulll@gmail.com    | SE          | AbcPvt       | ValidationError  | Validation error at createEmployee :: \"employeeName\" length must be at least 5 characters long  |
        | Atulll       | atulll@             | SE          | AbcPvt       | ValidationError  | Validation error at createEmployee :: \"employeeEmail\" must be a valid email                     |
        | Atulll       | atulll123@gmail.com | SE          | AbcPvt       | ObjectAlreadyExist | Employee already exist with same email!!!  |
        | Atulll       | atulll@gmail.com    | SE          | AbcPvt12     | ObjectNotFound   | There is no such company you are trying to register on!!! |


    
    Scenario Outline: Invalid employee name input then throw error.
    Given Employee details empname: <empname>, email: "<employeeEmail>", empdesg: "<empdesg>", empcompany: "<companyName>" to create new employee
    When Try to create new employee
    Then Throw error: "<error>" with message: "<message>" while creating a employee

    Examples:
        | empname    | employeeEmail      | empdesg       | companyName     | error            | message                         |
        | 12345      | atulll@gmail.com   | SE            | AbcPvt          | ValidationError  | Validation error at createEmployee :: \"employeeName\" must be a string      |


    Scenario Outline: Invalid employee designation input then throw error.
    Given Employee details empname: "<empname>", email: "<employeeEmail>", empdesg: <empdesg>, empcompany: "<companyName>" to create new employee
    When Try to create new employee
    Then Throw error: "<error>" with message: "<message>" while creating a employee

    Examples:
        | empname    |  employeeEmail   |  empdesg          | companyName      | error            | message                         |
        | Atullll    | atulll@gmail.com |  12345            | AbcPvt           | ValidationError  | Validation error at createEmployee :: \"empDesignation\" must be a string     |


    Scenario Outline: Invalid employee company id then throw error.
    Given Employee details empname: "<empname>", email: "<employeeEmail>", empdesg: "<empdesg>", empcompany: <companyName> to create new employee
    When Try to create new employee
    Then Throw error: "<error>" with message: "<message>" while creating a employee

    Examples:
        | empname    | employeeEmail     | empdesg          | companyName   | error            | message                              |
        | Atullll    | atulll@gmail.com  | SE               | 1234          | ValidationError  | Validation error at createEmployee :: \"companyName\" must be a string      |



    Scenario Outline: Valid inputs then create a employee.
    Given Employee details name: "<empname>", email: "<employeeEmail>", desgnation: "<empdesg>", company: "<companyName>" to create new employee
    When Try to create new employee
    Then It will create new employee with details: "<newEmployeeDetails>"

    Examples:
        | empname     | employeeEmail     | empdesg         | companyName       |  newEmployeeDetails  |
        | Atulll      | atulll@gmail.com  | SE              | AbcPvt            |  '[{"employee_id":"8f5f1240-5544-49f4-a37b-326f64e56ead"}]'         |
