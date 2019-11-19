import React from 'react';
import { Container } from 'react-bootstrap';

import { BaseComponent, Typography, SvgIcon } from '../../shared';
import { PromoFooter } from '../index';
import routes from '../../../constants/Routes';
import ThankyouImage from '../../../resources/background/captain-thankyou-background.svg';
import './_thankYou.scss';

class ThankYou extends BaseComponent {

    backToHomeHandler = () => {
        this.onLink(routes.main);
    }

    render() {
        return (
            <Container>
                <div className='bpp-thank-you'>
                    <div className='description-content'>
                        <Typography className='thankyou-title'>
                            Thank You!
                        </Typography>
                        <Typography lightColor className='thankyou-description'>
                            We’ve received your message and will get back to as soon as possible.
                        </Typography>
                        <span className='back-to-home' onClick={this.backToHomeHandler}>
                            <SvgIcon name='find-out-more' className='pr-2' />
                            Back to Home Page
                        </span>
                    </div>
                    <img src={ThankyouImage} alt='' className='thankyou-image' />
                </div>
                <PromoFooter />
            </Container>
        )
    }
}

export default ThankYou;