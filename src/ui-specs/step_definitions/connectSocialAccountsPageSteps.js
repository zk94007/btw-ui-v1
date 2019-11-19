var { defineSupportCode } = require('cucumber');
var signUpPage = require('../pages/emailSignUpPage');
var gmailEmailUtils = require("../utils/emailUtils");
var BrowserUtil = require('../utils/browserUtils');
var DBUtil = require('../utils/dataBaseUtils');


defineSupportCode(function ({ Given, When, Then }) {

    var userSignUpPage = new signUpPage();
    var DataBaseUtils = new DBUtil();
    var emailUtils = new gmailEmailUtils();

    Then('I should see show result button as disbaled on connect social account page', async () => {
        await expect(userSignUpPage.connectPageShowResultButton.isEnabled()).to.eventually.equal(false);    
    });

    When('I click on google connect button on connect social account page', async () => {
        await console.log("Need to be implemented");
    });

});  