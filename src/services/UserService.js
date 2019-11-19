import config from '../config/ApiConfig';
import { getAsync, postAsync, deleteAsync, patchAsync } from '../helpers/RequestHelper';

const UserService = {
    loadUser,
    checkForUniqueEmail,
    deleteUser,
    unsubscribeUser,
    updateProfile,
    getCurrentUser,
    addVotersToUser,
    changePassword,
    generateTaskForUser,
    resendConfirmationLink
};

function loadUser(userId) {
    return getAsync({
        url: `${config.apiHost}/api/v1/getUserById?${userId}`
    });
}

function checkForUniqueEmail(data) {
    return postAsync({
        url: `${config.apiHost}/api/v1/isEmailUnique`,
        data
    })
}

function deleteUser(data) {
    return deleteAsync({
        url: `${config.apiHost}/api/v1/deleteUser`,
        data
    })
}

function unsubscribeUser(data) {
    return patchAsync({
        url: `${config.apiHost}/user/unsubscribe`,
        data
    })
}

function updateProfile(data) {
    return patchAsync({
        url: `${config.apiHost}/user`,
        data
    })
}

function getCurrentUser() {
    return getAsync({
        url: `${config.apiHost}/user`,
    });
}

function addVotersToUser(voters) {
    return postAsync({
        url: `${config.apiHost}/user/addVoters`,
        data: { voters }
    })
}

function changePassword(data) {
    return postAsync({
        url: `${config.apiHost}/user/changePassword`,
        data
    })
}

function generateTaskForUser(userId) {
    return getAsync({
        url: `${config.apiHost}/task/generate/${userId}`
    });
}

function resendConfirmationLink(email) {
    return postAsync(({
        url: `${config.apiHost}/user/resendVerificationEmail`,
        data: { email }
    }))
}

export default UserService