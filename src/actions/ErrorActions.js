import ErrorConstants from '../constants/reducerConstants/ErrorConstants';
import userService from '../services/UserService';

export function checkForUniqueEmail(email, role) {
    return dispatch => {
        const data = {
          email,
          role
        };
        return userService.checkForUniqueEmail(data).then(
            response => {
                if (response.data.isUnique) {
                    dispatch(onSuccess());
                } else {
                    dispatch(onError(response.data.message));
                }
            },
            error => {
                dispatch(onError('User with such email is already exists'));
            });
    };

    function onError(error) {
        return { type: ErrorConstants.EMAIL_EXISTS, error };
    }

    function onSuccess( ) {
        return { type: ErrorConstants.EMAIL_EXISTS, error: false };
    }
}