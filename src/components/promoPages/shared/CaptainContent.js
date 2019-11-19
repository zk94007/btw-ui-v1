import React from 'react';

import { BaseComponent, Typography, Button } from '../../shared';
import BecomeCaptainImage from '../../../resources/background/become-captain.svg';
import routes from '../../../constants/Routes';

class CaptainContent extends BaseComponent {

    handleBecomeCaptain = () => {
        this.onLink(routes.becomeCaptain);
    }

    render() {
        return (
            <div className='bpp-become-captain'>
                <div className='captain-content'>
                    <Typography className='captain-title'>
                        Ready to become a part of our
                        Captain’s team?
                    </Typography>
                    <Button
                        size='medium'
                        className='caption-button'
                        onClick={this.handleBecomeCaptain}>
                        Find Out More
                    </Button>
                </div>
                <div className='image-content'>
                    <img src={BecomeCaptainImage} alt='' className='captain-image' />
                </div>
            </div>
        );
    }
}

export default CaptainContent;