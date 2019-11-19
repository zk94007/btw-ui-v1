var { defineSupportCode } = require('cucumber');
var signUpPage = require('../pages/emailSignUpPage');
var gmailEmailUtils = require("../utils/emailUtils");
var BrowserUtil = require('../utils/browserUtils');
var DBUtil = require('../utils/dataBaseUtils');


defineSupportCode(function ({ Given, When, Then }) {

    var userSignUpPage = new signUpPage();
    var DataBaseUtils = new DBUtil();
    var emailUtils = new gmailEmailUtils();
    Given('I am on application home page', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.homePageLogo, "homePageLogo", 30000);
        await userSignUpPage.homePageLogo.click();
        await expect(browser.getTitle()).to.eventually.equal("Turnout Nation");
        await userSignUpPage.homePageLoginButton.click();
        await expect(userSignUpPage.homePageLogo.isDisplayed()).to.eventually.equal(true);
    });

    When('I click on signup button on application home page', async () => {
        if(browser.name =="firefox"){
            await browser.get(browser.baseUrl + "signup");
        }else{
            await browser.get(browser.baseUrl + "/signup");   
        }
       // await browser.navigate().to(browser.signupUrl);
        // await userSignUpPage.signUpButton.click();
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.sigupPageHeader, "signUpButton", 30000);
        await expect(userSignUpPage.sigupPageHeader.getText()).to.eventually.equal("Sign Up");
    });

    Then('I should see application signup page', async () => {
        await expect(userSignUpPage.sigupPageHeader.getText()).to.eventually.equal("Sign Up");
    });

    Then('I should stay on email signup page', async () => {
        await expect(userSignUpPage.sigupPageHeader.getText()).to.eventually.equal("Sign Up");
    });

    Then('I should see signup with email', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.emailSignUpPageHeader, "SignUpPageHeader", 30000);
        await expect(userSignUpPage.emailSignUpPageHeader.getText()).to.eventually.equal("Or sign up with email:");
    });


    Then('I should see signup with facebook', async () => {
        await expect(userSignUpPage.signUpWithTypes.get(1).getText()).to.eventually.equal("Sign Up with Facebook");

    });


    Then('I should see signup with twitter', async () => {
        await expect(userSignUpPage.signUpWithTypes.get(2).getText()).to.eventually.equal("Sign Up with Twitter");

    });

    Then('I should see signup with google', async () => {
        await expect(userSignUpPage.signUpWithTypes.get(0).getText()).to.eventually.equal("Sign Up with Google");

    });


    Then('I should see Email signup page', async () => {
        await expect(userSignUpPage.emailSignUpPageHeader.getText()).to.eventually.equal("Or sign up with email");

    });


    When('I click on email signup button', async () => {
        await userSignUpPage.emailSigupSaveButton.click();

    });


    Then('I should see validation error for firstname as {string} on signup page', async (message) => {
        await expect(userSignUpPage.emailSignUpErrorMessage.get(0).getText()).to.eventually.equal(message.replace(/"/g, ""));

    });


    Then('I should see validation error for lastname as {string} on signup page', async (message) => {
        await expect(userSignUpPage.emailSignUpErrorMessage.get(1).getText()).to.eventually.equal(message.replace(/"/g, ""));

    });

    Then('I should see validation error for email as {string} on signup page', async (message) => {
        await expect(userSignUpPage.emailSignUpErrorMessage.get(2).getText()).to.eventually.equal(message.replace(/"/g, ""));

    });

    Then('I should see validation error for password as {string} on signup page', async (message) => {
        let validationMsg = await userSignUpPage.emailSignUpErrorMessage.get(3).getText();
        await console.log("Feature file::" + message)

        await console.log("Msg with newline::" + validationMsg)

        let validationMsgWithoutNewLine = await validationMsg.replace(/\n|\r/g, "");
        await console.log("Msg without newline::" + validationMsgWithoutNewLine)
        await expect(validationMsgWithoutNewLine).to.equal(message.replace(/"/g, ""));

    });


    When('I enter firstname as {string} on email signup page', async (firstname) => {
        //   await browser.sleep(5000);
        //   await BrowserUtil.waitForVisibility(userSignUpPage.firstNameTextBox);
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.firstNameTextBox, "firstNameTextBox", 30000);
        await userSignUpPage.firstNameTextBox.sendKeys(firstname.replace(/"/g, ""));
    });


    When('I enter lastname as {string} on email signup page', async (lastname) => {
        await userSignUpPage.lastNameTextBox.sendKeys(lastname.replace(/"/g, ""));

    });


    When('I enter email as {string} on email signup page', async (email) => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.emailTextBox, "emailTextBox", 30000);
        await userSignUpPage.emailTextBox.sendKeys(email.replace(/"/g, ""));

    });


    When('I enter password as {string} on email signup page', async (password) => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.PasswordTextBox, "PasswordTextBox", 30000);
        await userSignUpPage.PasswordTextBox.sendKeys(password.replace(/"/g, ""));

    });

    let verificationURL;
    Then('I should receive verification email', async () => {
        await browser.sleep(15000);
        let msg = await emailUtils.getConfirmationEmail("Confirm your registration");
        verificationURL = msg[1];
        await console.log("msg::" + verificationURL);
        await expect(verificationURL).to.not.be.null;

    });


    Then('I should see authorize app with user email as {string}', async (userEmail) => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.authorizeAppHeader, "authorizeAppHeader", 30000);
        await expect(userSignUpPage.authorizeAppHeader.getText()).to.eventually.equal("Authorize App");
        await expect(userSignUpPage.authorizeAppUserEmail.getText()).to.eventually.equal(userEmail.replace(/"/g, ""));
    });


    When('I click on allow button authorize app', async () => {
        await userSignUpPage.authorizeAppAllowButton.click();
    });


    Then('I should see watch later screen', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.watchlaterButton, "watchlaterButton", 30000);
        await expect(userSignUpPage.watchlaterButton.isDisplayed()).to.eventually.equal(true);

    });


    Then('I should see select voting page screen', async () => {
        browser.sleep(5000);
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.selectvotingdistirctPageTitle, "selectvotingdistirctPageTitle", 30000);
        await expect(userSignUpPage.selectvotingdistirctPageTitle.isDisplayed()).to.eventually.equal(true);

    });


    When('I click on logout button of Bethewave', async () => {
        await userSignUpPage.logoutDropdown.click();
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.logoutOkButton, "logoutOkButton", 30000);
        await userSignUpPage.logoutOkButton.click();
    });


    When('I login again to Bethewave with email as {stringInDoubleQuotes} and password as {stringInDoubleQuotes}', async (user, password) => {
        browser.sleep(5000);
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.loginEmailTxBx, "loginEmailTxBx", 30000);
        await userSignUpPage.loginEmailTxBx.clear().sendKeys(user.replace(/"/g, ""));
        await userSignUpPage.loginPasswordTxBx.clear().sendKeys(password.replace(/"/g, ""));
        await userSignUpPage.emailLoginButon.click();
    });


    When('I click facebook signup button', async () => {
        await userSignUpPage.signUpWithTypes.get(1).click();
    });

    Then('I should see facebook login page', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.facebookHomePageHeader, "facebookHomePageHeader", 30000);
        await expect(userSignUpPage.facebookHomePageHeader.getText()).to.eventually.equal("Facebook");

    });


    When('I enter email as {stringInDoubleQuotes} on facebook login page', async (user) => {
        await console.log(user);
        await userSignUpPage.facebookUserNameTxBx.clear().sendKeys(user);

    });


    When('I enter password as {stringInDoubleQuotes} on facebook login page', async (pass) => {
        await console.log(pass);
        await userSignUpPage.facebookPaswsordTxBx.clear().sendKeys(pass);
    });

    When('I click on facebook login button', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.facebookLoginButton, "facebookLoginButton", 30000);
        await userSignUpPage.facebookLoginButton.click();

    });


    Then('I should logout from Bethewave app', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.emailLoginButon, "ForgotPasswordemailTextBox", 30000);
        await expect(userSignUpPage.emailLoginButon.isDisplayed()).to.eventually.equal(true);

    });

    Then('I should see forgot password link', async () => {
        await expect(userSignUpPage.forgotpasswordLink.isDisplayed()).to.eventually.equal(true);

    });


    When('I click forgot password link', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.forgotpasswordLink, "forgotpasswordLink", 30000);
        await userSignUpPage.forgotpasswordLink.click();
    });


    Then('I should navigate reset password page', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.emailTextBox, "ForgotPasswordemailTextBox", 30000);
        await expect(userSignUpPage.forgotpasswordPageHeader.isDisplayed()).to.eventually.equal(true);
    });


    When('I enter email as {stringInDoubleQuotes} on email forgot password page', async (userEmail) => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.emailTextBox, "ForgotPasswordemailTextBox", 30000);
        await userSignUpPage.emailTextBox.sendKeys(userEmail);
    });


    When('I click reset password button on forgot password page', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.forgotpasswordButton, "forgotpasswordButton", 30000);
        await userSignUpPage.forgotpasswordButton.click();

    });


    let forgotpasswordLink;
    When('I should receive verification email to reset password', async () => {
        await browser.sleep(10000);
        let msg = await emailUtils.getConfirmationEmail("Reset password");
        forgotpasswordLink = msg[1];
        await console.log("forgotpassword link::" + forgotpasswordLink);

    });


    When('I click on forgot password link in email', async () => {
        await expect(forgotpasswordLink).to.not.be.null;
        await BrowserUtil.openPageInNewTab(forgotpasswordLink);
        await browser.sleep(3000);
    });


    Then('I should see password reset page', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.forgotpasswordPageHeader, "forgotpasswordPageHeader", 30000);
        await expect(userSignUpPage.forgotpasswordPageHeader.isDisplayed()).to.eventually.equal(true);
    });

    When('I reset password as {stringInDoubleQuotes} for reset password page', async (pass) => {
        await userSignUpPage.PasswordTextBox.sendKeys(pass);
        await userSignUpPage.confirmPasswordTxBx.sendKeys(pass);
        await userSignUpPage.saveNewpasswordButton.click();
    });

    When('I should remove user rigistred with email as {stringInDoubleQuotes}', async (userEmail) => {
        await DataBaseUtils.removeDocumentByEmail(userEmail);
        await browser.sleep(10000);
    });

    When('I should receive verification email to reset password with email as {stringInDoubleQuotes} and password as {stringInDoubleQuotes}', async (user, password) => {
        await browser.sleep(18000);
        let msg = await emailUtils.getConfirmationEmailByCredentials(user, password, "Reset password");
        forgotpasswordLink = msg[1];
        await console.log("forgotpassword link::" + forgotpasswordLink);
        await expect(forgotpasswordLink).to.not.be.null;
    });


    Then('I should receive verification email for confirm password for email as {stringInDoubleQuotes} and password as {stringInDoubleQuotes}', async (user, password) => {
        await browser.sleep(18000);
        let msg = await emailUtils.getConfirmationEmailByCredentials(user, password, "Confirm your registration");
        verificationURL = msg[1];
        await console.log("forgotpassword link::" + verificationURL);
        await expect(verificationURL).to.not.be.null;
    });

    Then('I should see show result button as disbaled on connect social account page', async () => {
        await console.log("Need to be implemented");
    });

    When('I click on google connect button on connect social account page', async () => {
        await console.log("Need to be implemented");
    });

});  