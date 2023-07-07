Feature: Get all session.

  Scenario Outline: Try to get all sessions, then it will give all the session list.
    Given Get all the session info.
    When Try to get all sessions.
    Then It will give session list: "<sessiondetails>"
    Then getAllSession function is called <getAllSession> time

    Examples: 
      |  getAllSession  | sessiondetails              |
      |        1        | '[{"session_id": "23bdf750-0695-11ee-ba84-6b13c17d4a43","jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiN2MwOGNjMmYtYjE0OC00NzcyLWIwNjItYjA4NTk3NDJjZjdjIiwiZXhwaXJ5VGltZSI6MTY4NjI5ODQxMTQ1OSwiaWF0IjoxNjg2Mjk0ODExfQ.2gNoHRWPS4ggg9o998Nu6ZFZHKgjvuM2ZfzpEb-aS_c","employee_id": "7c08cc2f-b148-4772-b062-b0859742cf7c","expiry_time": "1686298688524","ip": "103.238.107.135","employee_location": "Ahmedabad : 23.0258,72.5873","device": "Thunder Client (https://www.thunderclient.com)" }]' |
