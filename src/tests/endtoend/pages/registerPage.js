let core = require('../core');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {

	let registerPage = {
		firstName      : core.automate.By.id('firstname'),
		lastName       : core.automate.By.id('lastname'),
		email          : core.automate.By.id('email'),
		password       : core.automate.By.id('password'),
		confirmPassword: core.automate.By.id('confirmPassword'),
		terms_policy   : core.automate.By.id('terms_policy'),
		signUpButton   : core.automate.By.className('btw-button')
	}

	let registerNewAccount = async (args) => {
		try {

			await helper.timeout(1000);
			await driver.findElement(registerPage.firstName).sendKeys(args.firstname);
			await driver.findElement(registerPage.lastName).sendKeys(args.lastname);
			await driver.findElement(registerPage.email).sendKeys(args.email);
			await driver.findElement(registerPage.password).sendKeys(args.password);
			await driver.findElement(registerPage.confirmPassword).sendKeys(args.password);
			await driver.findElement(registerPage.terms_policy).click();
			let signUpButton = await driver.findElement(registerPage.signUpButton);
			signUpButton.click()

		} catch (error) {

			if (error instanceof core.automate.error.NoSuchElementError) {
				console.log(error)
				expect(false).to.be.true
			} else {
				console.log(error)
				expect(false).to.be.true
			}

		}
	};

	let shortListThreeVoters = async (voters) => {
		try {
			let nextView = await driver.wait(core.automate.until.elementLocated(helper.By.css('#btn-next button')), 15000);
			nextView.click();

			await helper.timeout(200);
			await driver.findElement(helper.By.css('#btn-next button')).click();

			await helper.timeout(200);
			for (let i = 0; i < 3; i++) {
				await driver.findElement(helper.By.id('firstname' + (i+1))).sendKeys( voters[i].firstname );
				await driver.findElement(helper.By.id('lastname' + (i+1))).sendKeys( voters[i].lastname );
			}

			let findBtn = await driver.findElement(helper.By.className('btw-button'));
			findBtn.click()
		} catch (error) {

			if (error instanceof core.automate.error.NoSuchElementError) {
				console.log(error)
				expect(false).to.be.true
			} else {
				console.log(error)
				expect(false).to.be.true
			}

		}
	};

	return {
		registerNewAccount,
		shortListThreeVoters
	}
}