/**
 *  Created by KennethObikwelu on 8/15/18.
 */


require('chromedriver');
const automate = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fs = require('fs-extra');

const browserCapabilities = require('./support/capabilities.json');

let driver;
chai.use(chaiAsPromised);
chai.config.truncateThreshold = 0;
chai.config.includeStack = true;


module.exports = {
	automate: automate,
	driver  : function () {
		return driver;
	}
};

before(() => {
	openBrowser();
});

function openBrowser() {
	driver = new automate.Builder()
		.withCapabilities(browserCapabilities['chrome'])
		.build();
}

after(async () => {
	await driver.quit()
})