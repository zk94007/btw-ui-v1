import appConstants from '../constants/reducerConstants/AppConstants';

export function initializeState(dataType) {
    return {
        type: appConstants.INITIALIZE_STATE,
        dataType
    };
}

export function initializeRequest(dataType) {
    return {
        type: appConstants.INITIALIZE_REQUEST,
        dataType
    };
}

export function loadDataSuccess(dataType, data) {
    return {
        type: appConstants.LOAD_DATA_SUCCESS,
        dataType,
        data
    };
}

export function loadDataFailure(dataType, error, data) {
    return {
        type: appConstants.LOAD_DATA_FAILURE,
        dataType,
        error,
        data
    };
}
