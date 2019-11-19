import config from '../config/ApiConfig';
import { postAsync } from '../helpers/RequestHelper';

export default {
    createGuestUser,
    subscribeGuestUser
}

function createGuestUser(user) {
    return postAsync({
        url: `${config.apiHost}/guestUser`,
        data: user
    });
}

function subscribeGuestUser(email) {
    return postAsync({
        url: `${config.apiHost}/guestUser/subscribe`,
        data: { email }
    });
}