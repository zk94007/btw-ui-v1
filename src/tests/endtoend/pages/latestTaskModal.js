
let core = require('../core');
let expect = require('chai').expect;

module.exports = (driver) => {

	let taskModal = {
		modalCDialog: core.automate.By.id('dashboardDialog'),
		goToTasksButtonOnModal   : core.automate.By.id('dashboardSplashSubmit'),
		dismissButtonOnModal   : core.automate.By.id('dashboardSplashDismiss')
	}

	let validateWelcomeModalIsDisplayed =   async  () => {
		try {
			await driver.wait(core.automate.until.elementLocated(taskModal.modalCDialog), 10000);
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				console.log(error)
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}

	};


	let dismissModal =  async () => {
		try {
			let modal = await driver.wait(core.automate.until.elementLocated(taskModal.dismissButtonOnModal), 10000);
			modal.click()
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}

	};

	let goToTasks = async () => {
		try {
			await driver.findElement(taskModal.goToTasksButtonOnModal).click();
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
		validateWelcomeModalIsDisplayed,
		dismissModal,
		goToTasks
	}
}