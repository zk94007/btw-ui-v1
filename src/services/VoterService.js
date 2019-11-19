import config from '../config/ApiConfig';
import { getAsync, patchAsync, uploadFileAsync } from '../helpers/RequestHelper';

const VoterService = {
	loadVoterList,
	importVotersByFile,
	fetchImportVoters,
	updateVoter,
	getTwitterFriends,
	getTwitterRequestTokens,
	importContactsFromGoogle,
	searchVoters
};

function searchVoters(query) {
	return getAsync({
		url: `${config.apiHost}/user/potentialVoters`,
		params: { query }
	})
}

function loadVoterList(userId) {
	return getAsync({
		url: `${config.apiHost}/voter/all/${userId}`
	});
}

function fetchImportVoters() {
	return getAsync({
		url: `${config.apiHost}/user/showResultV2`
	})
}

function updateVoter(voterId, data) {
	return patchAsync({
		url: `${config.apiHost}/voter/${voterId}`,
		data
	})
}

function importVotersByFile(file) {
	return uploadFileAsync({
		url: `${config.apiHost}/user/parseFile`,
		headers: { 'Content-Type': 'multipart/form-data' },
		file
	})
}

async function getTwitterRequestTokens() {
	const { token } = await getAsync({
		url: `${config.apiHost}/oauth/twitter/get_request_token`,
	});
	return token;
}

function getTwitterFriends(oauth_token, oauth_verifier) {
	return getAsync({
		url: `${config.apiHost}/oauth/twitter/friends/list`,
		params: { oauth_token, oauth_verifier }
	});
}

function importContactsFromGoogle(accessToken) {
	return getAsync({
		url: `${config.apiHost}/oauth/google/friends/list?access_token=${accessToken}`
	});
}

export default VoterService
