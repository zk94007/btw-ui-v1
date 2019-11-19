var GoogleSignUpPageObject = function () {
    this.googleSignPageHeader = element(by.css("div.Fmgc2c"));
    this.googleUserIdTextBx = element(by.id("identifierId"));
    this.nextButton = element(by.id("identifierNext"));
    this.signUpWithGoogle = $("#root div.btw-content div.buttons div:nth-child(1) span");
    this.passwordTxBx = element(by.css("[name='password']"));
    this.passwordNextButton = element(by.css("#passwordNext"));
    this.signUpWithTypes = element.all(by.css(".btw-sign-up .btw-social-button .btw-typography"));
    this.emailSignUpPageHeader = $("div.email-text");
    this.googleMobileVerificationPageHeader = element.all(by.css("#headingText > span"));
    this.verficationMobileNumberTxBx =element(by.id("phoneNumberId"));
    this.verficationpageNextButton = element(by.xpath("(//span[@class='CwaK9'])[1]"));
};
module.exports = GoogleSignUpPageObject;

