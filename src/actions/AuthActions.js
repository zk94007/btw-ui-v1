import PubSub from 'pubsub-js';

import identityService from '../services/IdentityService';
import UserService from '../services/UserService';
import authStorage from '../storage/AuthStorage';
import appDataTypes from '../constants/AppDataTypes';
import pubsubConstants from '../constants/PubSubConstants';
import appConstants from '../constants/reducerConstants/AppConstants';
import errorTypesConstants from '../constants/ErrorTypesConstants'
import routes from '../constants/Routes';
import Auth0Service from '../services/Auth0Service';
import history from '../utility/History';
import { logout } from '../helpers/AuthHelper';
import {
	storageKeys,
	LocalStorageManager as lsManager
} from '../storage';
import {
	initializeState,
	initializeRequest,
	loadDataSuccess,
	loadDataFailure
} from './AppAction';
import Role from '../constants/Roles';

const domain = window.location.origin;

export function signInWithToken(userInfo) {
	return dispatch => {
		if (parseInt(userInfo.expiresIn, 10) > 0) {
			authStorage.saveTokenInfo(userInfo);
			dispatch(checkCurrentUserStatus(true))
			return dispatch(loadDataSuccess(appDataTypes.signOn, null));
		}
		return dispatch(loadDataFailure(appDataTypes.signOn, 'Invalid token.'));
	};
}

export function signInWithMail(email, password) {

	return dispatch => {
		const auth0Service = new Auth0Service(domain + routes.signIn);

		dispatch(initializeRequest(appDataTypes.signOn));

		return auth0Service.signIn({ email, password }).then(
			() => {
				dispatch(loadDataSuccess(appDataTypes.signOn, null));
				dispatch(getUserProfile())
			},
			error => {
				dispatch(loadDataFailure(appDataTypes.signOn, error));
			});
	};
}

export function signUpWitMail(identity) {

	return dispatch => {
		const auth0Service = new Auth0Service(domain + routes.signUp);

		dispatch(initializeRequest(appDataTypes.register));

		return auth0Service.signUp(identity).then(
			() => {
				const { email, password } = identity;
				lsManager.setItem(storageKeys.firstLogin, true);
				dispatch(signInWithMail(email, password));
			},
			error => {
				dispatch(loadDataFailure(appDataTypes.register, errorTypesConstants.SIGNUP_USER_EMAIL_EXIST));
			})
	};
}

export function authorizeWithSocial(connection, isLogin = false) {
	return dispatch => {
		const subRoute = isLogin ? routes.signIn : routes.signUp;
		const type = isLogin ? appDataTypes.signOn : appDataTypes.register;

		const auth0Service = new Auth0Service(domain + subRoute);

		dispatch(initializeRequest(appDataTypes[type]));

		return auth0Service.socialAuthorize(connection).then(
			() => {
				dispatch(loadDataSuccess(appDataTypes[type], null));
			},
			error => {
				dispatch(loadDataFailure(appDataTypes[type], errorTypesConstants.SIGNUP_EMAIL_USED_SOCIAL_REGISTER));
			})
	};
}

export function signUpWithToken(userInfo) {
	const { token } = userInfo;

	return dispatch => {
		dispatch(signInWithToken(userInfo))
		dispatch(initializeRequest(appDataTypes.register));

		return identityService.getUser(token)
			.then(({ user }) => {
				const { registrationDate, lastLoginTime } = user;
				if (registrationDate === lastLoginTime) {
					lsManager.setItem(storageKeys.firstLogin, true);
				}
			})
			.catch(({ data: { message } }) => {
				return dispatch(loadDataFailure(appDataTypes.register, message));
			})
	}
}

export function getUserProfile() {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.profile));

		return UserService.getCurrentUser().then(
			({ user }) => {
				dispatch(loadDataSuccess(appDataTypes.profile, user))
			},
			error => {
				dispatch(loadDataFailure(appDataTypes.profile, error));
			})
	};
}

export function checkCurrentUserStatus(isRoute = false) {
	return dispatch => {
		dispatch(initializeRequest(appDataTypes.profile));
		return UserService.getCurrentUser().then(
			(data) => {
				const { user } = data
				dispatch(loadDataSuccess(appDataTypes.profile, user));
				authStorage.getUserMoreInfo(user)
				isRoute && history.push(authorizeRoute(user, routes.captainsDashboard))
			},
			error => {
				dispatch(loadDataFailure(appDataTypes.profile, error));
				authStorage.clearStorage()
				history.push(routes.signIn)
			}).finally(() => {
				PubSub.publish(pubsubConstants.onAuthChange, true);
			}
		);
	};
}

export function resolveOnBoardingRoute(user, toRoute = '') {
	let redirectRoute = toRoute;
	const { pathname } = history.location;
	const { onboarding } = user;

	if (onboarding) {
		if ([routes.connectGoogle, routes.connectTwitter].includes(pathname)) {
			return pathname
		}
		// if (lsManager.getItem(storageKeys.firstLogin)) {
		// 	redirectRoute = routes.welcome
		// } else
		if (!onboarding.district) {
			redirectRoute = routes.selectDistrict
		} else if (!onboarding.importSource) {
			redirectRoute = routes.socialConnect
		} else if (!onboarding.addTenVoters) {
			redirectRoute = routes.selectVoters
		}
	}

	return redirectRoute
}

export function authorizeRoute(pathname, user, roles = []) {
	const { onboarding } = user;
	const currentRole = authStorage.getCurrentRole();

	if (roles.includes(currentRole)) {
		return onboarding
			? resolveOnBoardingRoute(user, pathname)
			: pathname;
	}

	switch(currentRole) {
		case Role.guest:
			return routes.main;
		case Role.captain:
			return routes.captainsDashboard;
		default:
			return pathname;
	}
}

export function btwLogout() {
	return dispatch => {
		const callBackUrl = domain + routes.signIn;
		const auth0Service = new Auth0Service(callBackUrl);

		auth0Service.signOut();
		dispatch(logoutAction());
		logout();

		function logoutAction() {
			return { type: appConstants.USER_LOGOUT };
		}
	}
}

export function initializeAuthState() {
	return dispatch => {
		dispatch(initializeState(appDataTypes.register))
	}
}

