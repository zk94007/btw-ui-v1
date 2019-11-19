
const core = require('../core');
let dataParser = require('../support/dataParser');
let helper = require('../support/helper')
let createSignOnPage = require('../pages/signOnPage');
let createEmailPage = require('../pages/emailPage');
let createResetPasswordPage = require('../pages/resetPasswordPage');
let createTaskModal = require('../pages/latestTaskModal');
let createSignedOnHeader = require('../pages/signedOnHeader');



describe('Reset password end to end tests', ()=>{
	let signOnPage;
	let latestTaskModal;
	let signedOnHeader;
	let emailPage;
	let resetPasswordPage;


	let newPassword = helper.generatePassword();
	const user = dataParser.findByTag('user reset password');


	beforeEach(()=>{
		signOnPage = createSignOnPage(core.driver());
		emailPage = createEmailPage(core.driver());
		latestTaskModal = createTaskModal(core.driver());
		resetPasswordPage = createResetPasswordPage(core.driver());
		signedOnHeader = createSignedOnHeader(core.driver());
	});

	it('********************************************Happy Path forgot/reset password task',  async ()=>{
		await signOnPage.openSignOnPage('staging');
		await signOnPage.sendForgotPasswordRequest(user);
		await signOnPage.checkResetEmail(user.mail_url);
		await emailPage.resetPassword(user);
		await resetPasswordPage.validateFirstAndLastName(user);
		await resetPasswordPage.changePassword(newPassword);
		await signOnPage.validateSignOnPage();
		await signOnPage.checkResetPasswordResult();
		console.log ('new password is ' +  newPassword);
		await signOnPage.inputSignonInfo(user.email, newPassword);
		await latestTaskModal.validateWelcomeModalIsDisplayed();
		await latestTaskModal.dismissModal();
		await signedOnHeader.signOut();
	})
})
