let core = require('../core');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {

	let registerPage = {
		city              : helper.By.id('city'),
		email             : helper.By.id('email'),
    state             : helper.By.css('.state input')
  }

  let enterMoreDetailsForVoter =  async (index, voters) => {
    try {

      await helper.timeout(300)
      await driver.findElement(registerPage.email).sendKeys( voters[index].email );
      await driver.findElement(registerPage.city).sendKeys( voters[index].city );
      await driver.findElement(registerPage.state).sendKeys( voters[index].state + '\n' );

      await helper.timeout(300)
      await helper.selectButton('Go!')
      
	    let firstVoter = await driver.wait(core.automate.until.elementLocated(helper.By.css('#currentVoter0 #check')), 30000);
      firstVoter.click();
      
      await helper.timeout(300)
      await helper.selectButton('Yes')

      await helper.timeout(300)
      await helper.selectButton('Next Voter')

    } catch(error) {

      if (error instanceof core.automate.error.NoSuchElementError){
        console.log(error)
        expect(false).to.be.true
      }else {
        console.log(error)
        expect(false).to.be.true
      }

    }
  };

  let goBack = async () => {
    
    try {

      await helper.timeout(300)
      await helper.selectButton('Go back')

    } catch(error) {

      if (error instanceof core.automate.error.NoSuchElementError){
        console.log(error)
        expect(false).to.be.true
      }else {
        console.log(error)
        expect(false).to.be.true
      }

    }
  }

	return {
    enterMoreDetailsForVoter,
    goBack
	}
}