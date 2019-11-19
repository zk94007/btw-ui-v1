import voterService from '../services/VoterService';
import {
    actionImportRequest,
    actionImportSuccess,
    actionImportFailure

} from './VoterListActions';

import { getSource, isSameDistrict } from './helpers/voterHelper';

export function searchVotersByQuery(query) {
    return dispatch => {
        dispatch(actionImportRequest())
        return voterService.searchVoters(query).then(
            response => {
                let { potentialVoters } = response;

                potentialVoters.forEach(voter => {
                   voter.voterStatus = voter.voterStatusDesc || 'INACTIVE';
                   voter.socialNetwork = getSource(voter.source);
                   voter.isSameDistrict = isSameDistrict(voter);
                });
                dispatch(actionImportSuccess(potentialVoters))
            },
            error => {
                dispatch(actionImportFailure(error))
            }
        )
    };
}