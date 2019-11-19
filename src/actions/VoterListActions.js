import VoterConstants from '../constants/reducerConstants/VoterConstants';
import VoterService from '../services/VoterService';
import taskService from '../services/TaskService';
import authStorage from '../storage/AuthStorage';
import { LocalStorageManager as lsManager, storageKeys } from '../storage';
import { getSource, isSameDistrict } from './helpers/voterHelper';

const mapApiVoter = (voter, mapId = false, mapDistrict = false) => {
    const { voterStatusDesc, details: { voter_status_desc = '' } = {}, source } = voter;

    if (mapId) {
        voter.id = voter._id;
    }

    if (mapDistrict) {
        voter.isSameDistrict = isSameDistrict(voter);
    }

    voter.socialNetwork = getSource(source);
    voter.voterStatus = voterStatusDesc || voter_status_desc || 'INACTIVE';
    return voter;
};

export function loadVoterList(onSuccess = () => {}) {
    return dispatch => {
        dispatch(actionRequest());
        const { id } = authStorage.getLoggedUser();

        return VoterService.loadVoterList(id).then(
            response => {
                let { votersList = []} = response;
                votersList = votersList.map(voter => mapApiVoter(voter, true));

                onSuccess(votersList);
                dispatch(actionSuccess(votersList));
            },
            error => {
                dispatch(actionError(error.data.message));
            });
    };

    function actionSuccess(voters) {
        return { type: VoterConstants.VOTER_LIST_SUCCESS, voters };
    }
    function actionError(error) {
        return { type: VoterConstants.VOTER_LIST_ERROR, error };
    }
}

export function fetchImportVoters() {
    return dispatch => {
        dispatch(actionImportRequest());
        return VoterService.fetchImportVoters().then(
            response => {
                let { contacts } = response;

                contacts = contacts.filter(({ potentialVoters }) => potentialVoters && potentialVoters.length > 0);
                contacts = contacts.map(voter => {
                    const { potentialVoters } = voter;

                    voter = mapApiVoter(voter, true, true);
                    voter.potentialVoters = potentialVoters.map(voter => mapApiVoter(voter, false, true));

                    if (potentialVoters.length === 1) {
                        voter.potentialVoters = [];
                        return  { ...voter, ...potentialVoters[0]}
                    }

                    return voter;
                });

                dispatch(actionImportSuccess(contacts))
            },
            error => {
                dispatch(actionImportFailure(error))
            }
        )
    }
}

export function actionImportRequest() {
    return { type: VoterConstants.VOTER_IMPORT_LIST_REQUEST }
}

export function actionImportSuccess(importVoters) {
    return { type: VoterConstants.VOTER_IMPORT_LIST_SUCCESS, importVoters }
}

export function actionImportFailure(error) {
    return { type: VoterConstants.VOTER_IMPORT_LIST_ERROR, error }
}

export function importVotersFromFile(file) {
    return dispatch => {
        dispatch(actionRequest())
        return VoterService.importVotersByFile(file).then(
            response => {
                dispatch(fetchImportVoters());
                dispatch(actionSuccess())
            },
            error => {
                dispatch(actionFailure(error))
            }
        )
    }

    function actionSuccess() {
        return { type: VoterConstants.VOTER_UPLOAD_FILE_SUCCESS }
    }

    function actionFailure(error) {
        return { type: VoterConstants.VOTER_UPLOAD_FILE_FAILURE, error }
    }
}

export function getTaskListByVoter(voterId) {
    return dispatch => {
        dispatch(actionRequest())
        return taskService.getTaskListByVoter(voterId).then(
            response => {
                dispatch(actionSuccess(response.message ? [] : response, voterId))
            },
            error => {
                dispatch(actionFailure(error, voterId))
            }
        )
    }

    function actionSuccess(tasks, voterId) {
        return { type: VoterConstants.VOTER_TASK_LIST_SUCCESS, tasks, voterId }
    }

    function actionFailure(error, voterId) {
        return { type: VoterConstants.VOTER_TASK_LIST_ERROR, error, voterId }
    }
}

export function updateVoter(voterId, data) {
    return dispatch => {
        let { voterStatus, ...apiVoter } = data;
        apiVoter.voterStatusDesc = voterStatus;

        const voters = dispatch(getVoterList(voterId, data));
        dispatch(actionSuccess(voters));

        return VoterService.updateVoter(voterId, apiVoter).then(
            result => {
                dispatch(actionSuccess(voters));
            },
            error => {
                dispatch(actionError(error.data.message));
            });
    };

    function actionSuccess(voters) {
        return { type: VoterConstants.VOTER_UPDATE_SUCCESS, voters };
    }
    function actionError(error) {
        return { type: VoterConstants.VOTER_UPDATE_ERROR, error };
    }
}

export function importVotersFromGoogle(token) {
    return dispatch => {
        dispatch(actionSocialConnectRequest('isGoogle'));
        return VoterService.importContactsFromGoogle(token).then(
            result => {
                lsManager.setItem(storageKeys.googleConnected, true);
                dispatch(actionSuccess());
                dispatch(fetchImportVoters());
            },
            error => {
                dispatch(actionFailure(error.data.message))
            }
        )
    }

    function actionSuccess() {
        return { type: VoterConstants.VOTER_IMPORT_SOCIAL_SUCCESS, isGoogle: true }
    }

    function actionFailure(error) {
        return { type: VoterConstants.VOTER_IMPORT_SOCIAL_FAILURE, importSocialError: error, isGoogle: false }
    }
}

export function importVotersFromTwitter(oauth_token, oauth_verifier) {
    return dispatch => {
        dispatch(actionSocialConnectRequest('isTwitter'));
        return VoterService.getTwitterFriends(oauth_token, oauth_verifier).then(
            result => {
                lsManager.setItem(storageKeys.twitterConnected, true);
                dispatch(actionSuccess());
                dispatch(fetchImportVoters());
            },
            error => {
                dispatch(actionFailure(error.data.message))
            }
        )
    };

    function actionSuccess() {
        return { type: VoterConstants.VOTER_IMPORT_SOCIAL_SUCCESS, isTwitter: true }
    }

    function actionFailure(error) {
        return { type: VoterConstants.VOTER_IMPORT_SOCIAL_FAILURE, importSocialError: error, isTwitter: false }
    }
}

function actionSocialConnectRequest(field) {
    return { type: VoterConstants.VOTER_IMPORT_SOCIAL_REQUEST, [field]: false };
}

function actionRequest() {
    return { type: VoterConstants.VOTER_INIT_REQUEST }
}

const getVoterList = (voterId, data) => (dispatch, getState) => {
    let { voterList: { voters } } = getState();
    const voterIndex = voters.findIndex(voter => (voter.id === voterId));

    voters[voterIndex] = data;
    return voters;
};