Feature: Upload a file on google cloud.

  Scenario Outline: Try to upload a file on google cloud.
    Given UploadFile function wil be called.
    When Try to upload a file on gcs.
    Then It will give message on uploading file: "<message>"

    Examples: 
      | message                     |
      | File uploaded successfully  |