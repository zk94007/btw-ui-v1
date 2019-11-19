import update from 'immutability-helper';

import appConstants from '../constants/reducerConstants/AppConstants';
import initialState from '../constants/InitialState';

// this reducer used to store simple object data e. g signIn, signUp profile details and so on
// for complex objects use/create separate reducer
export default function appReducer (state = initialState.app, action) {
    const {
        type,
        dataType,
        data = {},
        error = ''
    } = action;

    const updateState = (isFetching = true, isSuccess = null, initial=false) => {
        return update(state, {
            [dataType]: {
                $set: initial ? initialState.app[dataType] : { isFetching, data, error, isSuccess }
            }
        });
    };

    switch (type) {
        case appConstants.INITIALIZE_STATE:
            return updateState(false, false, true)
        case appConstants.INITIALIZE_REQUEST:
            return updateState(true);
        case appConstants.LOAD_DATA_SUCCESS:
            return updateState(false, true);
        case appConstants.LOAD_DATA_FAILURE:
            return updateState(false, false);
        default:
            return state

    }
}