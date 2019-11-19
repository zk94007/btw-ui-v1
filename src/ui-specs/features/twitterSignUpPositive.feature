Feature: Verify user signup for Bethewave user signup with Twitter data
    1. Signup with twitter

    @regression
    Scenario Outline: Verify User Email signup with Twitter with valid details
        When I should remove user rigistred with email as "<email>"
        Given I am on application home page
        When I click on signup button on application home page
        Then I should see application signup page
        Then I should see signup with twitter
        Then I click on twitter signup button button
        Then I should see twitter authorize page
        When I enter useremailid as "<email>" and pasword as "<password>" on twitter signin page
        When I click twitter auth button on login page
        Then I should see select voting page screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app
        Examples:
            | firstname | lastname | email                   | password  |
            | First     | last     | bethewaveautomation@gmail.com | Singh123# |
