/**
 *  Created by KennethObikwelu on 8/22/18.
 */


let core = require('../core');
let dataParser = require('../support/dataParser');
let expect = require('chai').expect;
let helper = require('../support/helper')

module.exports = (driver) => {

	let dashboard = {
		captainsDashboard	: core.automate.By.className('btw-captains-dashboard'),
		taskCard					: core.automate.By.className('tasks'),
		votersCard   			: core.automate.By.className('voters'),
		messageCard   		: core.automate.By.className('messages')
	}

	let validateDashboard = async (...args) => {
		try {
			await helper.timeout(400)
			await driver.findElement(dashboard.captainsDashboard);
			await driver.findElement(dashboard.taskCard);
			await driver.findElement(dashboard.votersCard);
			await driver.findElement(dashboard.messageCard);
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	};

	let validateOnboardingResultProcess = async (value) => {
		try {
			let voters = await driver.findElement(helper.By.className('count'));
			let num = await voters.getText();
			expect(num).to.equal(value)
		}catch(error){
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	let goToVoterPage = async () => {
		try {
			await driver.executeScript(`
				document.getElementsByClassName('voters')[0].click()
			`);
		}catch(error){	
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	let validateVotersPage = async () => {
		try {
			await helper.timeout(1000)
			await driver.findElement(helper.By.className('voters-list'))
		}catch(error){	
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	let AddVoterFromVoterList = async (voterData) => {
		try {
			await helper.selectButton('Add Voter')

			// Add new voter info
			await helper.timeout(1000)
      await driver.findElement(helper.By.id('firstname')).sendKeys( voterData[4].firstname );
      await driver.findElement(helper.By.id('lastname')).sendKeys( voterData[4].lastname );
			await driver.findElement(helper.By.id('city')).sendKeys( voterData[4].city );
			await driver.findElement(helper.By.id('email')).sendKeys( voterData[4].email );
			await driver.findElement(helper.By.css('.state input')).sendKeys( voterData[4].state + '\n' );

			await helper.selectButton('Add')

			// Select first from match list
			let firstVoter = await driver.wait(core.automate.until.elementLocated(helper.By.css('#currentVoter0 #check')), 30000);
      firstVoter.click();
      
      await helper.timeout(300)
			await helper.selectButton('Yes')
			
		}catch(error){	
			if (error instanceof core.automate.error.NoSuchElementError){
				expect(false).to.be.true
			}else {
				console.log(error)
				expect(false).to.be.true
			}
		}
	}

	let validateUserIsRemovedFromVoterList = async (voterData) => {
		try {
			// Check if it is on voters page
			await driver.wait(core.automate.until.elementLocated(helper.By.className('voters-list')), 10000);

			// Check last voter is new voter
			let voters = await driver.findElements(helper.By.css('.name-info'))
			let name = await voters[voters.length - 1].getText()
			expect(name).to.equal(voterData[4].firstname + ' ' + voterData[4].lastname)

			// Click remove button
			let trashes = await driver.findElements(helper.By.css('.fa-trash'))
			await trashes[trashes.length - 1].click()

			await helper.timeout(300)
			await helper.selectButton('Yes')

			await helper.timeout(2000)

			// Check if new voter is removed
			voters = await driver.findElements(helper.By.css('.name-info'))
			name = await voters[voters.length - 1].getText()
			expect(name).to.not.equal(voterData[4].firstname + ' ' + voterData[4].lastname)
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
		validateDashboard,
		validateOnboardingResultProcess,
		goToVoterPage,
		validateVotersPage,
		AddVoterFromVoterList,
		validateUserIsRemovedFromVoterList
	}
}