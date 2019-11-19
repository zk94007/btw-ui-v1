import React from 'react';
import { Container } from 'react-bootstrap';

import { BaseComponent } from '../../shared';
import {
    ElectionContent,
    PromoDescription,
    TutorialCarousel,
    VideoContent,
    OurTeam
} from './index';
import {
    CaptainContent,
    PromoFooter
} from '../index';

class Promo extends BaseComponent {

    render() {
        return (
            <Container className='btw-promo'>
                <ElectionContent />
                <PromoDescription />
                <TutorialCarousel />
                <VideoContent />
                <OurTeam />
                <CaptainContent />
                <PromoFooter />
            </Container>
        );
    }
}

export default Promo;