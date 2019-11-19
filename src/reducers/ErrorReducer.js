import ErrorConstants from '../constants/reducerConstants/ErrorConstants';
import ErrorTypes from '../constants/ErrorTypesConstants';
import InitialState from '../constants/InitialState';

export default function errorReducer(state = InitialState.error, action) {
    switch (action.type) {
        case ErrorConstants.EMAIL_EXISTS: {
            return { ...state, [ErrorTypes.emailExists]: action.error };
        }
        default:
            return state
    }
}