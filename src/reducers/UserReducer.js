import UserConstants from '../constants/reducerConstants/UserConstants';
import InitialState from '../constants/InitialState';

export default function userReducer(state = InitialState.user, action) {
    switch (action.type) {
        // load user
        case UserConstants.INIT_USER_REQUEST: {
            return { ...state, isFetching: true };
        }
        case UserConstants.LOAD_USER_SUCCESS: {
            const { id, user } = action;
            return { ...state, ...{ users: { [id]: user }, isFetching: false, isSuccess: true } };
        }
        case UserConstants.LOAD_USER_FAILURE: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false } };
        }
        // delete user
        case UserConstants.DELETE_USER_REQUEST: {
            return { ...state, isDeleting: true, isDeleteSuccess: false };
        }
        case UserConstants.DELETE_USER_SUCCESS: {
            return { ...state, ...{ isDeleting: false, isDeleteSuccess: true } };
        }
        case UserConstants.DELETE_USER_FAILURE: {
            return { ...state, ...{ isDeleting: false, isDeleteSuccess: false } };
        }
        // unsubscribe
        case UserConstants.UNSUBSCRIBE_REQUEST: {
            return { ...state, ...{ isUnsubscribing: false, isUnsubscribed: false } };
        }
        case UserConstants.UNSUBSCRIBE_SUCCESS: {
            return { ...state, ...{ data: action.data, isUnsubscribing: false, isUnsubscribed: true } };
        }
        case UserConstants.UNSUBSCRIBE_FAILURE: {
            return { ...state, ...{ isUnsubscribing: false, isUnsubscribed: false } };
        }
        // update profile
        case UserConstants.UPDATE_PROFILE_REQUEST: {
            return { ...state, ...{ isUpdatingProfile: true, isUpdatedProfile: false } };
        }
        case UserConstants.UPDATE_PROFILE_SUCCESS: {
            return { ...state, ...{ data: action.data, isUpdatingProfile: false, isUpdatedProfile: true } };
        }
        case UserConstants.UPDATE_PROFILE_FAILURE: {
            return { ...state, ...{ isUpdatingProfile: false, isUpdatedProfile: false } };
        }
        // changing password
        case UserConstants.CHANGE_PASSWORD_REQUEST: {
            return { ...state, ...{ isChangingPassword: true } };
        }
        case UserConstants.CHANGE_PASSWORD_SUCCESS: {
            return { ...state, ...{ isChangingPassword: false } };
        }
        case UserConstants.CHANGE_PASSWORD_FAILURE: {
            return { ...state, ...{ error: action.error, isChangingPassword: false } };
        }
        case UserConstants.ADD_VOTERS_SUCCESS: {
            return { ...state, ...{ isFetching: false, voters: action.payload, isSuccess: true } }
        }
        case UserConstants.ADD_VOTERS_FAILURE: {
            return { ...state, ...{ isFetching: false, voters: [], isSuccess: false } }
        }
        default:
            return state
    }
}