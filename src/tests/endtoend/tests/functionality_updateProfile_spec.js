/**
 *  Created by KennethObikwelu on 8/23/18.
 */


const core = require('../core');
let dataParser = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');
let createTaskModal = require('../pages/latestTaskModal');
let createDashboardPage = require('../pages/dashboardPage');
let createSignedOnHeader = require('../pages/signedOnHeader');

describe('Update profile end to end tests', ()=>{
	let signOnPage;
	let latestTaskModal;
	let dashboardPage;
	let signedOnHeader;

	const user = dataParser.findByTag('end to end happy path');

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
		latestTaskModal = createTaskModal(core.driver());
		dashboardPage = createDashboardPage(core.driver());
		signedOnHeader = createSignedOnHeader(core.driver());
	});


	it('*****************************************Happy Path update user profile',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.inputSignonInfo(user.email, user.password);
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await dashboardPage.validateDashboard();
		await signedOnHeader.openUpdateProfilePage();
		await signedOnHeader.signOut();
	})
})
