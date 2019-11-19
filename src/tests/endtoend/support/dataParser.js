/**
 *  Created by KennethObikwelu on 8/16/18.
 */


let user = require('../data/users.json');
let url = require('../data/urls.json');

module.exports = {
	findByTag: function (tag) {
		let usersWithTag = user.users.filter(function (user) {
			return user.tags && user.tags.indexOf(tag) !== -1;
		});
		if (usersWithTag.length === 0) {
			throw new Error('Check " tags " for this particular test. Either the tag is outdated or user.json has been updated.');
		}
		return usersWithTag[0];
	},
	retrieveUrl                       : function (tag) {
		let urlWithTag = url.urls.filter(function (content) {
			return content.tags && content.tags.indexOf(tag) !== -1;
		});
		if (urlWithTag.length === 0) {
			throw new Error('Check " tags " for this particular test. Either the tag is outdated or dev.json has been updated.');
		}
		return urlWithTag[0];
	}
};