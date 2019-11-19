/**
 *  Created by KennethObikwelu on 8/16/18.
 */

const core = require('../core');
let urlFetcher = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');
let createTaskModal = require('../pages/latestTaskModal');
let createDashboardPage = require('../pages/dashboardPage');
let createSignedOnHeader = require('../pages/signedOnHeader');

describe('Login end to end tests', ()=>{
	let signOnPage;
	let latestTaskModal;
	let dashboardPage;
	let signedOnHeader;

	const user = urlFetcher.findByTag('end to end happy path');

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
		latestTaskModal = createTaskModal(core.driver());
		dashboardPage = createDashboardPage(core.driver());
		signedOnHeader = createSignedOnHeader(core.driver());
	});

	it('****************************************** Login successfully',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.inputSignonInfo(user.email, user.password);
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await dashboardPage.validateDashboard();
		await signedOnHeader.signOut();
		await signOnPage.validateSignOnPage();
	})
})

