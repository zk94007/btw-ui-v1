import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SocialList } from '../index';
import ComingSoon from './ComingSoon';

class VoterCommunication extends BaseComponent {
    constructor() {
        super();
        this.state = {
            readMore: false
        }
    }

    readMoreButtonHandler = () => {
        this.setState((prevState) => ({
            readMore: !prevState.readMore
        }));
    };

    renderReadMoreButton = (type) => {
        const { readMore } = this.state;

        if (type === 'showLess') {
            return readMore && (<Typography variant='body' onClick={this.readMoreButtonHandler} className='show-more'>Show Less</Typography>)
        }
        return !readMore && (<>.. <span onClick={this.readMoreButtonHandler} className='show-more'>Read more</span></>)
    };

    render() {
        const { selectedVoter } = this.props;

        return (
            <div className='btw-voter-communication'>
                <Typography className='title'>
                    Channels of communication
                </Typography>
                <div className='social-status'>
                    <Typography variant='body' lightColor className='social-text'>
                        You are conneced with this user on:
                    </Typography>
                    <SocialList social={selectedVoter.socialNetwork} />
                </div>
                <ComingSoon />
            </div>
        );
    }
}

VoterCommunication.propTypes = {
    selectedVoter: PropTypes.object
};

export default VoterCommunication;
