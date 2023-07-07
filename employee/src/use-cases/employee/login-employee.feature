Feature: Employee login

    Scenario Outline: Invalid or empty inputs then throw error to login of an employee.
    Given Enter employee email: "<employeeEmail>", ip:"<ip>", userAgent:"<userAgent>" to login an employee
    When Try to login an employee
    Then Throw error: "<error>" with message: "<message>" while logging in an employee
    

    Examples:
        | employeeEmail             |         ip           |                userAgent                         | error      | message                                                                 |
        |                           |  103.238.107.135     |  Thunder Client (https://www.thunderclient.com)  |   ValidationError    | Validation error at loginEmployee \"employeeEmail\" is required         |
        | atulmakwana4500@gmail.com |                      |  Thunder Client (https://www.thunderclient.com)  |   ValidationError    | Validation error at loginEmployee \"ip\" is required                    |
        | atulmakwana4500@gmail.com |  103.238.107.135     |                                                  |   ValidationError    | Validation error at loginEmployee \"userAgent\" is required             |
        | atulmakwana4500@gmail.com |  103.238.            |  Thunder Client (https://www.thunderclient.com)  |   ValidationError    | Validation error at loginEmployee \"ip\" must be a valid ip address with a optional CIDR           |
        | atulmakwana123@gmail.com  |  103.238.107.135     |  Thunder Client (https://www.thunderclient.com)  |   ObjectNotFound     | Error at loginEmployee :: There is no user with this email!!!           |
        | mayank1234@gmail.com      |  103.238.107.135     |  Thunder Client (https://www.thunderclient.com)  |   ForbiddenError     | Error at loginEmployee :: Please first verify the employee!!!           |


    Scenario Outline: Valid inputs then login employee and save session data.
    Given Enter employee email: "<employeeEmail>", ip:"<ip>", userAgent:"<userAgent>" to login an employee
    When Try to login an employee
    Then Show message:"<message>" when employee logged in
    

    Examples:
        | employeeEmail             |         ip           |                userAgent                         |  message                               |
        # | atulmakwana450@gmail.com  |  103.238.107.135     |  Thunder Client (https://www.thunderclient.com)  | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiN2MwOGNjMmYtYjE0OC00NzcyLWIwNjItYjA4NTk3NDJjZjdjIiwiZXhwaXJ5VGltZSI6MTY4Nzc2NzIyNjQwNywiaWF0IjoxNjg3NzYzNjI2fQ.uR3UFimX9l_EZoEU-akEdN0agSAKYjx3b5c223Alx1U       |
