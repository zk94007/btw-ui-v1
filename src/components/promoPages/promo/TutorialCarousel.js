import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { BaseComponent, Typography, SvgIcon } from '../../shared';

class TutorialCarousel extends BaseComponent {

    render() {
        const { contents } = this.props;

        return (
            <div className='bpp-tutorial-carousel'>
                <Carousel showStatus={false} infiniteLoop={true}
                    autoPlay showArrows={false} showThumbs={false}>
                    {contents.map((content, index) => (
                        <div key={index}>
                            <Typography variant='body' fontWeight='600' className='phone-text'>
                                {content.title}
                            </Typography>
                            <div className='carousel-background'>
                                <div className='carousel-content'>
                                    <Typography variant='body' fontWeight='600' className='computer-text'>
                                        {content.title}
                                    </Typography>
                                    <SvgIcon name={content.img} />
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    }
}

TutorialCarousel.defaultProps = {
    contents: [
        {
            title: 'Step 1: Easily check if your friends are registered to vote.',
            img: 'promo-carousel-check'
        },
        {
            title: 'Step 2: Follow up tips by experienced deep mobilizing experts to help you engage with your intended audience and unlock rewards.',
            img: 'promo-carousel-follow'
        },
        {
            title: 'Step 3: Ensure voter is registered with the evidence.',
            img: 'promo-carousel-ensure'
        }
    ]
}

export default TutorialCarousel;