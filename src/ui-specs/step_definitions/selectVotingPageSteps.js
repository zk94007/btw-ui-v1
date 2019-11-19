var { defineSupportCode } = require('cucumber');
var signUpPage = require('../pages/emailSignUpPage');
var gmailEmailUtils = require("../utils/emailUtils");
var BrowserUtil = require('../utils/browserUtils');
var DBUtil = require('../utils/dataBaseUtils');


defineSupportCode(function ({ Given, When, Then }) {

    var userSignUpPage = new signUpPage();
    var DataBaseUtils = new DBUtil();
    var emailUtils = new gmailEmailUtils();

      When('I enter district name as {stringInDoubleQuotes} on select district page', async (district)=> {
        await browser.sleep(3000);
        await userSignUpPage.searchVotingDistritTxBx.sendKeys(district);
        await userSignUpPage.searchVotingDistritTxBx.click();
      });

      Then('I should see district select info message as {stringInDoubleQuotes}', async (infoMsg)=> {
        await browser.sleep(8000);
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.votingDistrictMessage, "votingDistrictMessage", 30000);
        await expect(userSignUpPage.votingDistrictMessage.getText()).to.eventually.equal(infoMsg);
      });

      When('I select district sleect check box on select district page', async ()=> {
        await browser.sleep(5000);
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.votingDistrictList.get(0), "votingDistrictList", 30000);
        await userSignUpPage.votingDistrictList.get(1).click();
      });

      Then('I next button should be enabled on select district page', async ()=> {
        await browser.sleep(5000);
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.selectVotingPageNextButton, "selectVotingPageNextButton", 30000);
        await expect(userSignUpPage.selectVotingPageNextButton.isEnabled()).to.eventually.equal(true);
      });

      Then('I next button should be dissabled on select district page',  async ()=> {
        await expect(userSignUpPage.selectVotingPageNextButton.isEnabled()).to.eventually.equal(false);

      });

      When('I check displayed voting district when select voting page',  async ()=> {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.selectDistrictRadio, "selectVotingPageNextButton", 30000);
        await userSignUpPage.selectDistrictRadio.click();
      });

      When('I click on Next button on select voting district page', async ()=> {
        await userSignUpPage.selectVotingPageNextButton.click();
        await browser.sleep(5000);
      });

      Then('I should navigate to Connect social accounts page', async ()=> {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.connectSocialPageHeader, "connectSocialPageHeader", 30000);
        await expect(userSignUpPage.connectSocialPageHeader.getText()).to.eventually.equal("Connect social accounts");
      });

      Then('I should see Import your own voters list section on social account page', async ()=> {
        await BrowserUtil.waitElementUntilVisibleOrEnable(userSignUpPage.socialConnectPageUploadVotingSectionHeader, "uploadSocialConnetModelHeader", 30000);
        await expect(userSignUpPage.socialConnectPageUploadVotingSectionHeader.getText()).to.eventually.equal("Import your own voters list");
      });

      Then('I should see google connect on social accounts page', async ()=>{
        await expect(userSignUpPage.googleSocialConnectButton.getText()).to.eventually.equal("Connect");

      });

      Then('I should see twitter connect on social accounts page', async ()=> {
        await expect(userSignUpPage.twitterSocialConnectButton.getText()).to.eventually.equal("Connect");
      });

});  