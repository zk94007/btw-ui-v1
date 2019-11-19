import React from 'react';

import { BaseComponent, Typography } from '../../shared';
import CaptainImage from '../../../resources/background/become-captain-background.svg';

class CaptainDescription extends BaseComponent {

    render() {
        return (
            <div className='bbc-captain-description'>
                <div className='description-content'>
                    <Typography className='captain-title'>
                        Interested in becoming a Captain?
                    </Typography>
                    <Typography lightColor className='captain-description'>
                        Please, fill in the form below and we will get back to you.
                        No commitment though, we just want to get to know you a bit.
                    </Typography>
                </div>
                <img src={CaptainImage} alt='' className='captain-image' />
            </div>
        );
    }
}

export default CaptainDescription;