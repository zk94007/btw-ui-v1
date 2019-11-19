import localStorage from 'localStorage';
import roles from '../constants/Roles';
import cookies from 'js-cookie';

import storageKeys from './constants/storageKeys';

export default {
    saveTokenInfo,
    getLoggedUser,
    isAuthenticated,
    getTokenInfo,
    getCurrentRole,
    getUserMoreInfo,
    clearStorage
};

function saveTokenInfo(tokenInfo) {
    let user = tokenInfo.idToken;
    user.role = roles.captain;
    cookies.set(storageKeys.tokenInfo, JSON.stringify(tokenInfo));
    localStorage.setItem(storageKeys.user, JSON.stringify({
        ...user, 
        
    }));
}

function getLoggedUser() {
    return JSON.parse(localStorage.getItem(storageKeys.user)) || {};
}

function getTokenInfo() {
    return JSON.parse(cookies.get(storageKeys.tokenInfo) || '{}') || {};
}

function getCurrentRole() {
    return getLoggedUser().role || roles.guest;
}

function isAuthenticated() {
    return !!getLoggedUser().email;
}

function getUserMoreInfo(user) {
    const _user = getLoggedUser()
    localStorage.setItem(storageKeys.user, JSON.stringify({..._user, ...user}));   
}

function clearStorage() {
    localStorage.clear();
    cookies.remove(storageKeys.tokenInfo);
}