import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { BaseComponent, VoterAvatar, Typography, VoterStatusDropdown } from '../index';

class VoterProfile extends BaseComponent {

    render() {
        const { selectedVoter, changeStatusHandler } = this.props;

        return (
            <div className={classNames('btw-voter-profile')}>
                <VoterAvatar
                    size={56}
                    firstname={selectedVoter.firstname}
                    lastname={selectedVoter.lastname}
                    src={selectedVoter.src}
                    status={selectedVoter.voterStatus || 'INACTIVE'} />
                <Typography className='voter-name'>
                    {selectedVoter.firstname} {selectedVoter.lastname}
                </Typography>
                <VoterStatusDropdown status={selectedVoter.voterStatus || 'INACTIVE'} onSelect={changeStatusHandler} />
                <Typography variant='body' className='voter-info'>
                    {`${selectedVoter.gender || 'Male'} | ${selectedVoter.address}`}
                </Typography>
            </div>
        );
    }
}

VoterProfile.propTypes = {
    selectedVoter: PropTypes.object,
    changeStatusHandler: PropTypes.func
};

export default VoterProfile;