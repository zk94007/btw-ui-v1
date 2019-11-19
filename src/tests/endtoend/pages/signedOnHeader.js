/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {

	let signedOnHeader = {
		signOutNavDropDown: core.automate.By.id('nav-dropdown'),
		signOutLink: core.automate.By.linkText('Sign Out')
	}

	function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}

	let signOut = async () => {
		try {
			let menu = await driver.wait(core.automate.until.elementLocated(signedOnHeader.signOutNavDropDown), 4000);
			await timeout(1000)
			menu.click()

			await clickSignout();
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	};

	let clickSignout = async () => {
		try {
			let a_signout = await driver.findElement(core.automate.By.xpath('//*[@id="root"]/div/div/div[1]/div/nav/div/div[2]/ul[2]/li[3]/ul/li[2]/a'));
			await timeout(100)
			a_signout.click()
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	let openUpdateProfilePage = async () => {
		try {
			// Open nav menu
			let menu = await driver.wait(core.automate.until.elementLocated(signedOnHeader.signOutNavDropDown), 4000);
			await timeout(1000)
			menu.click()

			// Click manage account btn
			let a_profile = await driver.findElement(core.automate.By.xpath('//*[@id="root"]/div/div/div[1]/div/nav/div/div[2]/ul[2]/li[3]/ul/li[1]/a'));
			await timeout(100)
			a_profile.click()

			await timeout(300)
			await driver.findElement(core.automate.By.className('profile'))

		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	};

	let closeAccount = async (newUser) => {
		try {
			// Open nav menu
			let menu = await driver.wait(core.automate.until.elementLocated(signedOnHeader.signOutNavDropDown), 4000);
			await timeout(1000)
			menu.click()

			// Click manage account btn
			let a_profile = await driver.findElement(core.automate.By.xpath('//*[@id="root"]/div/div/div[1]/div/nav/div/div[2]/ul[2]/li[3]/ul/li[1]/a'));
			await timeout(100)
			a_profile.click()

			// Click close account btn
			await timeout(100)
			let closeBtn = await driver.findElement(core.automate.By.id('closeAccountBtn'));
			closeBtn.click()

			// Wait until dialog is displayed
			let confirmName = await driver.wait(core.automate.until.elementLocated(helper.By.id('confirmName')), 10000);
			confirmName.sendKeys(newUser.firstname + ' ' + newUser.lastname);

			// Click I understand btn
			await timeout(100)
			let confirmBtn = await driver.findElement(core.automate.By.id('closeAccountConfirmBtn'));
			confirmBtn.click()

		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	return {
		signOut,
		closeAccount,
		openUpdateProfilePage
	}
}