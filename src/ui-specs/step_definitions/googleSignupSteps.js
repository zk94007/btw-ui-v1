var { defineSupportCode } = require('cucumber');
var googleSignUp = require('../pages/googleSignUpPage');
var BrowserUtil = require('../utils/browserUtils');
var gmailEmailUtils = require("../utils/emailUtils");

defineSupportCode(function ({ Given, When, Then }) {

    var googleSignUpPage = new googleSignUp();
    var emailUtils = new gmailEmailUtils();


    Then('I click on google signup button button', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(googleSignUpPage.signUpWithGoogle, "signUpWithGoogle", 30000);
        await googleSignUpPage.signUpWithGoogle.click();
      });

      When('I enter useremailid as {stringInDoubleQuotes} on google signin page', async (userid) => {
        await googleSignUpPage.googleUserIdTextBx.sendKeys(userid.replace(/"/g, ""));
      });
      
      Then('I should see google sign page', async () => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(googleSignUpPage.googleSignPageHeader, "signUpWithGoogle", 30000);
        await expect(googleSignUpPage.googleSignPageHeader.isDisplayed()).to.eventually.equal(true);

      });

      When('I click next button on google login oage',  async () => {
        await browser.sleep(3000);
        await BrowserUtil.waitElementUntilVisibleOrEnable(googleSignUpPage.nextButton, "nextButton", 30000);
        await googleSignUpPage.nextButton.click();
        await browser.sleep(7000);
      });
    
      When('I enter password as {stringInDoubleQuotes} on google signin page',  async (password) => {
        await BrowserUtil.waitElementUntilVisibleOrEnable(googleSignUpPage.passwordTxBx, "passwordTxBx", 30000);
        await googleSignUpPage.passwordTxBx.sendKeys(password.replace(/"/g, ""));

      })

      When('I click on google password page next button', async () => {
        await browser.sleep(4000);
        await BrowserUtil.waitElementUntilVisibleOrEnable(googleSignUpPage.passwordNextButton, "signUpWithGoogle", 30000);
        await googleSignUpPage.passwordNextButton.click();
        await browser.sleep(4000);

        let  googleMobileVerificationPageHeader= await googleSignUpPage.googleMobileVerificationPageHeader;
        if (googleMobileVerificationPageHeader.length) {
            // Success
          console.log("Google verification page displaying");
          await googleSignUpPage.verficationMobileNumberTxBx.sendKeys(browser.googleMobile);
          await googleSignUpPage.verficationpageNextButton.click();
          await browser.sleep(3000);
        } else {
          console.log("Google verification page not displaying");
        }

      });

      Then('I should receive verification email with username as {stringInDoubleQuotes} and password as {stringInDoubleQuotes}', async (user, password) => {
        await browser.sleep(15000);
        let msg = await emailUtils.getConfirmationEmailByCredentials(user.replace(/"/g, ""), password.replace(/"/g, ""), "Confirm your registration");
        verificationURL = msg[1];
        await console.log("msg::" + verificationURL);
        await expect(verificationURL).to.not.be.null;
      });

});  