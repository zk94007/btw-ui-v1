import React from 'react';

import { BaseComponent, Typography } from '../../shared';
import ElectionImage from '../../../resources/background/election-background.svg';

class ElectionContent extends BaseComponent {

    render() {
        return (
            <div className='bpp-election-content'>
                <Typography className='election-title'>
                    Elections are won not by changing minds but by getting people to vote.
                </Typography>
                <Typography lightColor className='election-description'>
                    We help activists identify friends who they can help register and vote,
                    to keep track of those friend, support them, and know if they voted or not.
                    Pretty simple.
                </Typography>
                <img src={ElectionImage} alt='' className='election-image' />
            </div>
        );
    }
}

export default ElectionContent;