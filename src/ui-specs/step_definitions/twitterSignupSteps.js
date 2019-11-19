var { defineSupportCode } = require('cucumber');
var twitterSignUp = require('../pages/twitterSignUpPage');
var BrowserUtil = require('../utils/browserUtils');
var gmailEmailUtils = require("../utils/emailUtils");

defineSupportCode(function ({ Given, When, Then }) {

  var twitterSignUpPage = new twitterSignUp();
  var emailUtils = new gmailEmailUtils();


  Then('I click on twitter signup button button', async () => {
    await twitterSignUpPage.signUpWithTwitter.click();
  });


  Then('I should see twitter authorize page', async () => {
    await BrowserUtil.waitElementUntilVisibleOrEnable(twitterSignUpPage.twitterSignPageHeader, "twitterSignPageHeader", 30000);
    await expect(twitterSignUpPage.twitterSignPageHeader.isDisplayed()).to.eventually.equal(true);

  });

  When('I enter useremailid as {stringInDoubleQuotes} and pasword as {stringInDoubleQuotes} on twitter signin page', async (user, password) => {
    await twitterSignUpPage.twitterUserId.sendKeys(user);
    await twitterSignUpPage.twitterPassword.sendKeys(password);


  });

  When('I click twitter auth button on login page', async () => {
    await twitterSignUpPage.allowButton.click();
    await browser.sleep(3000);
    let  twitterVerifyPageHeader= await twitterSignUpPage.twitterVerifyPageHeader;
      if (twitterVerifyPageHeader.length) {
          // Success
        console.log("Twitter verification page displaying");
        await twitterSignUpPage.mobileNumberTxBx.sendKeys(browser.twitterMobile);
        await twitterSignUpPage.verifyMobileSubmitButton.click();
        await browser.sleep(1000);
        await twitterSignUpPage.allowButton.click();
        await browser.sleep(3000);
      } else {
        console.log("Twitter verification page not displaying");
      }
  });
});  