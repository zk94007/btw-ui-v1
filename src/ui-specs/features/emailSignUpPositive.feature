Feature: Verify user signup for Bethewave user signup with valid email signup data
    1. SignUp with email
    2. Signup with facebook
    3. Signup with twitter
    4. Signup with google

    @regression
    Scenario Outline: Verify User Email signup with valid data
        When I should remove user rigistred with email as "<email>"
        Given I am on application home page
        When I click on signup button on application home page
        Then I should see application signup page
        Then I should see signup with email
        When I enter firstname as "<firstname>" on email signup page
        When I enter lastname as "<lastname>" on email signup page
        When I enter email as "<email>" on email signup page
        When I enter password as "<password>" on email signup page
        When I click on email signup button
        Then I should receive verification email
        Then I should see authorize app with user email as "<email>"
        When I click on allow button authorize app
        Then I should see watch later screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app
        When I login again to Bethewave with email as "<email>" and password as "<password>"
        Then I should see select voting page screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app

        Examples:
            | firstname | lastname | email                    | password  |
            | First     | last     | turnoutnation2@gmail.com | Singh123# |

    @regression
    Scenario Outline: Verify forgot password feature for Turnout nation application
        Given I am on application home page
       # When I click on signup button on application home page
        Then I should see forgot password link
        When I click forgot password link
        Then I should navigate reset password page
        When I enter email as "<email>" on email forgot password page
        When I click reset password button on forgot password page
        When I should receive verification email to reset password with email as "<email>" and password as "<password>"
        When I click on forgot password link in email
        Then I should see password reset page
        When I reset password as "<newpassword>" for reset password page
        When I login again to Bethewave with email as "<email>" and password as "<newpassword>"
        Then I should see select voting page screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app
        Examples:
            | firstname | lastname | email                    | password  | newpassword |
            | First     | last     | turnoutnation2@gmail.com | Singh123# | Singh1234#  |

    @regression2
    Scenario Outline: Verify User should navigate select voting page if he signout from select voting page
        When I should remove user rigistred with email as "<email>"
        Given I am on application home page
        When I click on signup button on application home page
        Then I should see application signup page
        Then I should see signup with email
        When I enter firstname as "<firstname>" on email signup page
        When I enter lastname as "<lastname>" on email signup page
        When I enter email as "<email>" on email signup page
        When I enter password as "<password>" on email signup page
        When I click on email signup button
        Then I should receive verification email for confirm password for email as "<email>" and password as "<password>"
        Then I should see authorize app with user email as "<email>"
        When I click on allow button authorize app
        Then I should see watch later screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app
        When I login again to Bethewave with email as "<email>" and password as "<password>"
        Then I should see select voting page screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app
        When I login again to Bethewave with email as "<email>" and password as "<password>"
        Then I should see select voting page screen
        When I enter district name as "<districtname>" on select district page
        When I select district sleect check box on select district page
        Then I should see district select info message as "<districtInfoSelectMsg>"
        Then I next button should be dissabled on select district page
        When I check displayed voting district when select voting page
        Then I next button should be enabled on select district page
        When I click on Next button on select voting district page
        Then I should navigate to Connect social accounts page
        Then I should see Import your own voters list section on social account page
        Then I should see google connect on social accounts page
        Then I should see twitter connect on social accounts page
        Then I should see show result button as disbaled on connect social account page
        When I click on google connect button on connect social account page

        Examples:
            | firstname | lastname | email                    | password  | districtname | districtInfoSelectMsg                                                         |
            | First     | last     | turnoutnation2@gmail.com | Singh123# | California   | The information you provided overlaps 1 voting districts. Please, select one: |

    @regression1
    Scenario Outline: Verify User Facebook signup with valid data
        When I should remove user rigistred with email as "<email>"
        Given I am on application home page
        When I click on signup button on application home page
        Then I should see application signup page
        Then I should see signup with facebook
        When I click facebook signup button
        Then I should see facebook login page
        When I should remove user rigistred with email as "<email>"
        When I enter email as "<email>" on facebook login page
        When I enter password as "<password>" on facebook login page
        When I click on facebook login button
        #Then I should see authorize app with user email as "<username>"
        # When I click on allow button authorize app
        #Then I should see watch later screen
        Then I should see select voting page screen
        When I click on logout button of Bethewave
        Then I should logout from Bethewave app
        Examples:
            | firstname | lastname | email                         | password  | username |
            | First     | last     | bethewaveautomation@gmail.com | Singh123# | Sam Ram  |