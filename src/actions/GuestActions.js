import {
    initializeRequest,
    loadDataSuccess,
    loadDataFailure
} from './AppAction';
import appDataTypes from '../constants/AppDataTypes';
import guestService from '../services/GuestService';

export function createGuestUser(user) {
    const dataType = appDataTypes.createGuest;

    return dispatch => {
        dispatch(initializeRequest(dataType));
        return guestService.createGuestUser(user).then(
            data => {
                dispatch(loadDataSuccess(dataType, user));
            },
            error => {
                dispatch(loadDataFailure(dataType, error));
            });
    };
}

export function subscribeGuestUser(email) {
    const dataType = appDataTypes.subscribeGuest;

    return dispatch => {
        dispatch(initializeRequest(dataType));
        return guestService.subscribeGuestUser(email).then(
            data => {
                dispatch(loadDataSuccess(dataType, email));
            },
            ({ data }) => {
                dispatch(loadDataFailure(dataType, data.message));
            });
    };
}

export function resetSubscribe() {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.subscribeGuest));
    }
}