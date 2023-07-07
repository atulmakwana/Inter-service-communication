Feature: send an Email to company mail address.

  Scenario Outline: Send an e-mail to company.
    Given sendMail function will be called
    When Try to send mail to company
    Then It will show detail: "<emaildetail>"

    Examples: 
      | emaildetail                 |
      | Email sent successfully!  |