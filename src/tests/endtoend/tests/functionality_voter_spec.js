
const core = require('../core');
let dataParser = require('../support/dataParser');
let createSignOnPage = require('../pages/signOnPage');
let createTaskModal = require('../pages/latestTaskModal');
let createDashboardPage = require('../pages/dashboardPage');
let createSignedOnHeader = require('../pages/signedOnHeader');

describe('Voter end to end tests', ()=>{
	let signOnPage;
	let latestTaskModal;
	let dashboardPage;
	let signedOnHeader;

	const user = dataParser.findByTag('end to end happy path');
	const voterData = dataParser.findByTag('new voters').voters;

	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
		latestTaskModal = createTaskModal(core.driver());
		dashboardPage = createDashboardPage(core.driver());
		signedOnHeader = createSignedOnHeader(core.driver());
	});

	it('*******************************************Happy Path add/remove voter',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.inputSignonInfo(user.email, user.password);
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await dashboardPage.validateDashboard();
		await dashboardPage.goToVoterPage();
		await dashboardPage.validateVotersPage();
		await dashboardPage.AddVoterFromVoterList(voterData);
		await dashboardPage.validateUserIsRemovedFromVoterList(voterData);
		await signedOnHeader.signOut();
	})
})
