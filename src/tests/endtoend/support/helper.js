let core = require('../core');

module.exports = {

	timeout: function(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
	},

	By: core.automate.By,

	selectButton: async function (buttonName) {
		let foundItem = null;
		let options = await core.driver().findElements(core.automate.By.tagName('button'))
		
		for (let i=0; i<options.length; i++) {
			let text = await options[i].getText()
			if (text === buttonName) {
				foundItem = options[i];
				break;
			}
		}
		if (foundItem) {
			foundItem.click()
		}
	},
	 generatePassword: () => {

		let UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
		let NUMBER = '0123456789';
		let SPECIAL = '!@#$%^&*';
		let generatedPassword = '';

		generatedPassword += UPPERCASE[ Math.floor(Math.random() * 26) ]
		generatedPassword += LOWERCASE[ Math.floor(Math.random() * 26) ]
		generatedPassword += UPPERCASE[ Math.floor(Math.random() * 26) ]
		generatedPassword += LOWERCASE[ Math.floor(Math.random() * 26) ]
		generatedPassword += NUMBER[ Math.floor(Math.random() * 10) ]
		generatedPassword += SPECIAL[ Math.floor(Math.random() * 8) ]
		generatedPassword += NUMBER[ Math.floor(Math.random() * 10) ]
		generatedPassword += SPECIAL[ Math.floor(Math.random() * 8) ]

		return generatedPassword
	}
}