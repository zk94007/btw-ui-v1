import React from 'react';
import { VoterAvatar } from '../../../voterComponents';
import { SocialList, Typography} from '../../../index';

const VoterInfo = ({ selectedVoter }) => {
    return (
        <div className='voter-info'>
            <VoterAvatar
                firstname={selectedVoter.firstname}
                lastname={selectedVoter.lastname}
                noBorder
            />
            <div className='voter-status'>
                <Typography variant='body'>
                    {selectedVoter.firstname} {selectedVoter.lastname}
                </Typography>
                <SocialList social={selectedVoter.socialNetwork} />
            </div>
        </div>
    )
};

export default VoterInfo;