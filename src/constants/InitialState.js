import appDataTypes from './AppDataTypes';
import errorTypes from './ErrorTypesConstants';

export default {
    app: {
        [appDataTypes.signOn]: {},
        [appDataTypes.register]: {},
        [appDataTypes.profile]: {}
    },
    request: {},
    voterList: {
        importVoters: [],
        voters: [],
        tasks: [],
        count: 0,
        isFetching: false,
        isImportFetching: false,
        isSuccess: false,
        error: null,
        updateVoterError: null,
    },
    taskList: {
        tasks: [],
        isFetching: false,
        isSuccess: false,
        error: null
    },
    user: {
        users: {},
        voters: [],
        isFetching: false,
        isSuccess: false,
        isDeleteSuccess: false,
        isDeleting: false,
        isChangingPassword: false,
        error: null
    },
    districtList: {
        selected: {},
        districts: [],
        districtSearchList: [],
        count: 0,
        isFetching: false,
        isSuccess: false,
        error: null
    },
    error: {
        [errorTypes.emailExists]: false
    }
}
