import config from '../config/ApiConfig';
import { postAsync, getAsync } from '../helpers/RequestHelper';

export default {
    forgotPasswordRequest,
    verifyTokenRequest,
    changePasswordRequest
};

function forgotPasswordRequest(data) {
    return postAsync({
        url: `${config.apiHost}/user/resetPassword/sendEmail`,
        data,
        headers: {},
        includeToken: false
    });
}

function verifyTokenRequest(token) {
    return getAsync({
        url: `${config.apiHost}/user/resetPassword/check/${token}`,
        headers: {},
        includeToken: false
    });
}

function changePasswordRequest(data) {
    return postAsync({
        url: `${config.apiHost}/user/resetPassword/reset`,
        data,
        headers: {},
        includeToken: false
    });
}