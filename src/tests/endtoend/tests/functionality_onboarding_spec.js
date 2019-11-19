/**
 *  Created by KennethObikwelu on 8/23/18.
 */


const core = require('../core');
let dataParser = require('../support/dataParser');
let createSignOnPage 			= require('../pages/signOnPage');
let createRegisterPage 		= require('../pages/registerPage');
let createOnBoardingPages 	= require('../pages/onboardingPage');
let createTaskModal 			= require('../pages/latestTaskModal');
let createDashboardPage 	= require('../pages/dashboardPage');
let createSignedOnHeader 	= require('../pages/signedOnHeader');

describe('Onboarding end to end tests', ()=>{

	const newUser = dataParser.findByTag('new user signup');
	let voters = dataParser.findByTag('new voters').voters

	let signOnPage;
	let latestTaskModal;
	let dashboardPage;
	let signedOnHeader;
	let registerPage;
	let onBoardingPages;

	beforeEach(()=>{
		signOnPage 				= createSignOnPage(core.driver());
		registerPage 			= createRegisterPage(core.driver());
		onBoardingPages 	= createOnBoardingPages(core.driver());
		latestTaskModal 	= createTaskModal(core.driver());
		dashboardPage 		= createDashboardPage(core.driver());
		signedOnHeader 		= createSignedOnHeader(core.driver());
	});


	it('****************************************** Happy Path onBoarding',  async () => {
		await signOnPage.openSignOnPage('staging');
		await signOnPage.openRegisterPage();
		await registerPage.registerNewAccount(newUser);
		await registerPage.shortListThreeVoters(voters);
		await onBoardingPages.enterMoreDetailsForVoter('0', voters);
		await onBoardingPages.enterMoreDetailsForVoter('1', voters);
		await onBoardingPages.enterMoreDetailsForVoter('2', voters);
		await onBoardingPages.goBack();
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await signedOnHeader.closeAccount(newUser);
		await signOnPage.validateSignOnPage();
	})
})
