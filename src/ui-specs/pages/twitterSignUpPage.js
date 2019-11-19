var GoogleSignUpPageObject = function () {
    this.twitterSignPageHeader = element(by.css("#bd > div > h2"));
    this.signUpWithTwitter = $("#root div.btw-content div.buttons > div:nth-child(3) span");
    this.twitterUserId = element(by.id("username_or_email"));
    this.twitterPassword = element(by.id("password"));
    this.allowButton = element(by.id("allow"));

    //verify mobile 
    this.twitterVerifyPageHeader = element.all(by.css("body > div.PageContainer > div > div"));
    this.mobileNumberTxBx = element(by.id("challenge_response"));
    this.verifyMobileSubmitButton = element(by.css("input#email_challenge_submit"));
};
module.exports = GoogleSignUpPageObject;

