import UserConstansts from '../constants/reducerConstants/UserConstants';
import UserService from '../services/UserService';
import appDataTypes from '../constants/AppDataTypes';
import {
    initializeRequest,
    loadDataSuccess,
    loadDataFailure
} from './AppAction';
import authStorage from '../storage/AuthStorage'
import history from '../utility/History'
import routes from '../constants/Routes'
import { resolveOnBoardingRoute } from './index'

export function loadUser(userId) {
    return (dispatch, getState) => {
        const user = getState().user.users[userId];
        if (!user) {
            dispatch(actionRequest());
            return UserService.loadUser(userId).then(
                response => {
                    dispatch(actionSuccess(userId, response.data.user));
                },
                error => {
                    dispatch(actionError(error.response.data.message));
                });
        }
    };

    function actionRequest() {
        return { type: UserConstansts.LOAD_USER_SUCCESS };
    }
    function actionSuccess(id, user) {
        return { type: UserConstansts.LOAD_USER_SUCCESS, id, user };
    }
    function actionError(error) {
        return { type: UserConstansts.LOAD_USER_FAILURE, error };
    }
}

export function deleteUser(data) {
    return dispatch => {
        dispatch(actionRequest());
        return UserService.deleteUser(data).then(
            result => {
                dispatch(actionSuccess());
            },
            error => {
                dispatch(actionError(error.response.data.message));
            });
    };

    function actionRequest() {
        return { type: UserConstansts.DELETE_USER_REQUEST };
    }
    function actionSuccess() {
        return { type: UserConstansts.DELETE_USER_SUCCESS };
    }
    function actionError(error) {
        return { type: UserConstansts.DELETE_USER_FAILURE, error };
    }
}

export function unsubscribeUser(email) {
    return dispatch => {
        const data = {
            email
        };

        dispatch(actionRequest)
        return UserService.unsubscribeUser(data).then(
            response => {
                dispatch(actionSucceeded(response.data));
            },
            error => {
                dispatch(actionFailed(error));
            });
    };

    function actionSucceeded(data) {
        return { type: UserConstansts.UNSUBSCRIBE_SUCCESS, data };
    }
    function actionRequest() {
        return { type: UserConstansts.UNSUBSCRIBE_REQUEST };
    }
    function actionFailed(err) {
        return { type: UserConstansts.UNSUBSCRIBE_FAILURE, err };
    }
}

export function getCurrentUser() {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.profile));
        return UserService.getCurrentUser().then(
            (data) => {
                dispatch(loadDataSuccess(appDataTypes.profile, data.user));
            },
            error => {
                dispatch(loadDataFailure(appDataTypes.profile, error));
            });
    };
}

export function changePassword(data) {
    return dispatch => {
        dispatch(actionRequest());
        return UserService.changePassword(data).then(
            response => {
                dispatch(actionSuccess());
            },
            error => {
                dispatch(actionFailure(error));
            });
    };

    function actionRequest() {
        return { type: UserConstansts.CHANGE_PASSWORD_REQUEST }
    }

    function actionSuccess() {
        return { type: UserConstansts.CHANGE_PASSWORD_SUCCESS }
    }

    function actionFailure(error) {
        return { type: UserConstansts.CHANGE_PASSWORD_FAILURE, error }
    }
}

export function updateProfile(userToUpdate, isRoute = false) {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.profile));
        return UserService.updateProfile(userToUpdate).then(
            (data) => {
                const { isEmailConfirmed } = userToUpdate;
                const updatedUser = {...{ isEmailConfirmed }, ...data.user };

                dispatch(loadDataSuccess(appDataTypes.profile, updatedUser));
                authStorage.getUserMoreInfo(updatedUser || {})
                isRoute && history.push(resolveOnBoardingRoute(authStorage.getLoggedUser(), routes.captainsDashboard))
            },
            error => {
                dispatch(loadDataFailure(appDataTypes.profile, error));
            });
    };
}

export function updateOnboardingByDistrict(user, district, status) {
    return { district, onboarding: { ...user.onboarding, district: status } }
}

export function updateOnboardingBySource(user, status) {
    return { onboarding: { ...user.onboarding, importSource: status } }
}

export function updateOnboardingByVoter(user, status) {
    return { onboarding: { ...user.onboarding, addTenVoters: status } }
}

export function initOnboardingByVoter() {
    return { onboarding: { district: false, importSource: false, addTenVoters: false } }
}

export function addVotersToUser(voters) {
    return dispatch => {

        voters = voters.map(({ id, _index }) => ({ id, _index }));

        dispatch(actionRequest());

        return UserService.addVotersToUser(voters).then(
            _ => {
                UserService.generateTaskForUser(authStorage.getLoggedUser().id).then(() => {}, error => {});

                dispatch(actionSuccess(voters))
            },
            error => {
                dispatch(actionFailure())
            })
    };

    function actionRequest() {
        return { type: UserConstansts.INIT_USER_REQUEST }
    }

    function actionSuccess(voters) {
        return { type: UserConstansts.ADD_VOTERS_SUCCESS, payload: voters }
    }

    function actionFailure() {
        return { type: UserConstansts.ADD_VOTERS_FAILURE }
    }
}

export function resendConfirmationLink(email) {
    return dispatch => {
        dispatch(initializeRequest(appDataTypes.resendConfirmationLink));

        return UserService.resendConfirmationLink(email).then(
            (data) => {
                dispatch(loadDataSuccess(appDataTypes.resendConfirmationLink, data));
            },
            error => {
                dispatch(loadDataFailure(appDataTypes.resendConfirmationLink, error));
            });
    };
}