
let core = require('../core');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {

	let resetPassword = async (data) => {
		try {
      // Click login btn
			// let loginMenu = await driver.wait(core.automate.until.elementLocated(helper.By.className('gmail-nav__nav-link__sign-in')), 10000);
			// await helper.timeout(1000)
      // loginMenu.click()
      
      // Input email address
      let emailField = await driver.wait(core.automate.until.elementLocated(helper.By.id('identifierId')), 10000);
      await helper.timeout(1000)
      emailField.sendKeys(data.email)

      // Click next btn
      let nextBtn = await driver.wait(core.automate.until.elementLocated(helper.By.id('identifierNext')), 10000);
      await helper.timeout(1000)
      nextBtn.click()

      // Input email address
      let passwordField = await driver.wait(core.automate.until.elementLocated(helper.By.css('input[name="password"]')), 10000);
      await helper.timeout(1000)
      passwordField.sendKeys(data.password)

      // Click next btn
      nextBtn = await driver.wait(core.automate.until.elementLocated(helper.By.id('passwordNext')), 10000);
      await helper.timeout(1000)
      nextBtn.click();

      // Click email
      await driver.wait(core.automate.until.elementLocated(helper.By.css('tbody')), 10000);
      await helper.timeout(3000)

      let emailBody= await driver.findElement(helper.By.xpath('//*[@id=":3a"]'));
      emailBody.click();

      // Expand email content if there are several
      await helper.timeout(1000)
      let expand = await driver.findElement(helper.By.className('ajT'))

      if (expand) {
        expand.click();
      }

      // Click link in reset email
      await helper.timeout(1000)
      await helper.selectButton('Reset');

		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
  };
  
	return {
		resetPassword
	}
}