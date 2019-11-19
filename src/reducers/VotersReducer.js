import update from 'immutability-helper';

import VoterContants from '../constants/reducerConstants/VoterConstants';
import InitialState from '../constants/InitialState';

export default function votersReducer(state = InitialState.voterList, action) {
    const updateWithTasks = isSuccess => {
        const { voters } = state;
        const { tasks, voterId, error = '' } = action;
        const index = voters.findIndex(({ _id }) => _id === voterId) || 0;
        const voter = voters[index];
        

        voter.tasks = tasks;
        voter.tasksLoaded = true;

        return update(state, {
            voters: {
                [index]: { $set: voter }
            },
            isFetching: { $set: false },
            isSuccess: { $set: isSuccess },
            error: { $set: error }
        });
    };

    switch (action.type) {
        case VoterContants.VOTER_INIT_REQUEST: {
            return { ...state, isFetching: true, isImportFetching: true };
        }
        case VoterContants.VOTER_LIST_SUCCESS: {
            return { ...state, ...{ voters: action.voters, isFetching: false, isSuccess: true } };
        }
        case VoterContants.VOTER_LIST_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false } };
        }
        case VoterContants.VOTER_IMPORT_LIST_REQUEST: {
            return { ...state, isImportFetching: true };
        }
        case VoterContants.VOTER_IMPORT_LIST_SUCCESS: {
            return { ...state, ...{ importVoters: action.importVoters, isImportFetching: false, isSuccess: true } };
        }
        case VoterContants.VOTER_IMPORT_LIST_ERROR: {
            return { ...state, ...{ error: action.error, isImportFetching: false, isSuccess: false } };
        }
        case VoterContants.VOTER_TASK_LIST_SUCCESS: {
            return updateWithTasks(true);
        }
        case VoterContants.VOTER_TASK_LIST_ERROR: {
            return updateWithTasks(false);
        }
        case VoterContants.VOTER_UPDATE_SUCCESS: {
            return update(state, {
                voters: {
                    $set: action.voters
                }});
        }
        case VoterContants.VOTER_UPDATE_ERROR: {
            return { ...state, ...{ error: action.error, isSuccess: false } };
        }

        case VoterContants.VOTER_IMPORT_SOCIAL_REQUEST: {
            return { ...state, isImportSocialFetching: true, isGoogle: false, isTwitter: false, importSocialError: ''}
        }

        case VoterContants.VOTER_UPLOAD_FILE_SUCCESS:
        case VoterContants.VOTER_IMPORT_SOCIAL_SUCCESS: {
            return { ...state, isFetching: false, isImportSocialFetching: false, isSuccess: true, isGoogle: action.isGoogle || state.isGoogle, isTwitter: action.isTwitter || state.isTwitter }
        }

        case VoterContants.VOTER_UPLOAD_FILE_FAILURE:
        case VoterContants.VOTER_IMPORT_SOCIAL_FAILURE: {
            return { ...state, isImportSocialFetching: false, isSuccess: false, importSocialError: action.importSocialError }
        }

        default:
            return state
    }
}