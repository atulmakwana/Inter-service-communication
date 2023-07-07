Feature: Download a file from google cloud.

  Scenario Outline: Try to download a file from google cloud.
    Given DownloadFile function will be called.
    When Try to download a file from gcs.
    Then It will give message on downloading file: "<message>"

    Examples: 
      | message                     |
      | File downloaded successfully  |