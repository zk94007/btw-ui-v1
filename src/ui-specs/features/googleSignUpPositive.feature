Feature: Verify user signup for Bethewave user signup with Google data
    1. Signup with google

    @regression
    Scenario Outline: Verify User Email signup with valid google detail
        When I should remove user rigistred with email as "<email>"
        Given I am on application home page
        When I click on signup button on application home page
        Then I should see application signup page
        Then I should see signup with google
        Then I click on google signup button button
        Then I should see google sign page
        When I enter useremailid as "<email>" on google signin page
        When I click next button on google login oage 
        When I enter password as "<password>" on google signin page
        When I click on google password page next button
        Then I should see select voting page screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app

        Examples:
            | firstname | lastname | email                   | password  |
            | First     | last     | turnoutnation@gmail.com | Singh123# |

