var UserSignupPageObject = function () {
    this.signUpButton = element(by.linkText("Sign Up"));
    this.sigupPageHeader = $(".btw-typography.heading.title");
    this.homePageLoginButton = element(by.buttonText("Log In"));
    this.homePageLogo = $("div.btw-header-logo img");
    this.signUpWithGoogle = $("#root div.buttons > div:nth-child(1) span:nth-child(2)");
    this.signUpWithFacebook = $("#root div.buttons > div:nth-child(2) span:nth-child(2)");
    this.signUpWithTwitter = $("#root div.buttons > div:nth-child(3) span:nth-child(2)");
    this.signUpWithTypes = element.all(by.css(".btw-sign-up .btw-social-button .btw-typography"));
    this.emailSignUpPageHeader = $("div.email-text");

   // this.emailSignUpPageHeader = element(by.id("firstname"));
    this.emailSigupSaveButton = element(by.buttonText("Sign Up"));
    this.emailSignUpErrorMessage = element.all(by.css("div.error-msg"));
    this.firstNameTextBox = element(by.xpath("(//*[@id='root']//div[1]/input)[1]"));
    this.lastNameTextBox = element(by.xpath("(//*[@id='root']//div[1]/input)[2]"));
    this.emailTextBox = element(by.id("email"));
    this.PasswordTextBox = element(by.id("password"));
    this.authorizeAppHeader = element(by.css("span.first-line"));
    this.authorizeAppUserEmail = element(by.css("#authorize-modal > form > div.body > span > span:nth-child(1)"));
    this.authorizeAppAllowButton = element(by.id("allow"));
    this.watchlaterButton = element(by.css(".watch-later-div button"));
    this.logoutDropdown = element(by.id("dropdown-basic"));
    this.logoutOkButton = element(by.xpath("(//div[@class='modal-footer']/button)[2]"));
    this.loginEmailTxBx =element(by.id("email"));
    this.loginPasswordTxBx = element(by.id("password"));
    this.emailLoginButon = element(by.buttonText("Log In"));
    this.selectvotingdistirctPageTitle = element(by.css(".btw-select-disctrict.container div.title"));
    //facebook signup
    this.facebookHomePageHeader = element(by.css("#blueBarDOMInspector i u"));
    this.facebookUserNameTxBx = element(by.id("email"));
    this.facebookPaswsordTxBx = element(by.id("pass"));
    this.facebookLoginButton = element(by.id("loginbutton"));
    //forgot password
    this.forgotpasswordLink = element(by.linkText("Forgot Password"));
    this.forgotpasswordPageHeader = element(by.css("div.btw-content div.btw-typography.heading.title"));
    this.forgotpasswordButton = element(by.buttonText("Send Verification Link"));
    this.confirmPasswordTxBx = element(by.id("confirmPassword"));
    this.saveNewpasswordButton = element(by.buttonText("Save New Password"));
    //select voting page
    this.searchVotingDistritTxBx = element(by.css("#root > div > div.btw-content  input"));
    this.votingDistrictList = element.all(by.css(".item div.item-value"));
    this.votingDistrictMessage = element(by.css("#root div.btw-typography.body.description-result"));
    this.selectDistrictRadio = element(by.css(".districts-list img"));
    this.selectVotingPageNextButton = element(by.buttonText("Next"));
    //Social Connect page
    this.connectSocialPageHeader = element(by.css("div.btw-content div:nth-child(1) > div.btw-typography.heading.title"));
    this.socialConnectPageUploadVotingSectionHeader = element(by.css("div.content.upload-content > div.btw-typography.heading.title"));
    this.googleSocialConnectButton = element(by.css("div.social-group > div:nth-child(1) > div.main-container > div.controls > a"));
    this.twitterSocialConnectButton= element(by.css(" div:nth-child(1) > div.social-group > div:nth-child(2) > div.main-container > div.controls > a"));
    this.uploadSocialConnectButton = element(by.css("div.btw-content div.content.upload-content > button"));
    this.uploadSocialConnetModelHeader = element(by.css("div.fade.btw-modal.bsc-upload-dialog.modal.show div.modal-header > div"));
    this.importModelUploadButton = element(by.buttonText("Upload"));
    this.uploadedFileInfo = element(by.css(".file-info div"));
    this.connectPageShowResultButton= element(by.buttonText("Show Results"));
};
module.exports = UserSignupPageObject;

