import config from '../config/ApiConfig';
import { getAsync } from '../helpers/RequestHelper';

const IdentityService = {
	getUser,
};

function getUser(token) {
	const getHeaders = () => token ? { 'Authorization': `Bearer ${token}`} : {};

	return getAsync({
		url: `${config.apiHost}/user`,
		headers: getHeaders(),
		includeToken: !token,
		failRedirect: !token
	});
}

export default IdentityService