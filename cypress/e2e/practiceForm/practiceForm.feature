Feature: demoqa.com automation practice form

#To Do - Convert following requirement into a testable feature

# As an automation tester
# I want to fill in and submit the form on the demoqa.com website with the details:
# First Name - Jane
# Last name - Smith
# Email address - automation-test@tester.com
# Phone number - 1234567891
# So that I can make sure the form is being completed and showing the correct user details


# As an automation tester
# I want to be able complete the above scenario by passing in an array of user details and submit the form for each of these users
# So that I can make this feature run for any amount of user details passed in

# classic start on the page under test
Background: 
  Given I am on the demoqa automation practice form page

# naive approach: fill in the form with hardcoded values and verify confirmation messages
  Scenario: Fill in and submit form with fixed values
    When I fill in the form with 'Jane', 'Smith', 'automation-test@tester.com', '01 January,1999', 'Female', '1234567891'
    And I submit the form
    Then a confirmation dialog is shown with the correct user details

# my chosen implementation: use test data stored in examples in the feature file
  Scenario Outline: Fill in and submit form with a list of user details
    When I fill in the form with '<firstname>', '<lastname>', '<email>', '<dob>', '<gender>', '<mobile>'
    And I submit the form
    Then a confirmation dialog is shown with the correct user details
  Examples:
        | firstname | lastname | email                       | dob | gender | mobile      |
        | Jane      | Smith    | automation-test@tester.com  | 01 January,1999     | Female | 1234567891 |
        | John      | Chan     | automation-test2@tester.com | 31 December,1987    | Male   | 9876543211 |

# over-engineered solution: use test data from fixture while keeping steps separate
  Scenario: Fill in and submit the form with a list of users from a fixture
    Given I load a list of user details from a fixture
    When I fill in and submit the form with all user details
    Then all the confirmation dialogs show the correct correct details