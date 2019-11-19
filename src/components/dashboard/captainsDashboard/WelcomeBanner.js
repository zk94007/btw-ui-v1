import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { BaseComponent, Typography, SvgIcon, Button } from '../../shared';

class WelcomeBanner extends BaseComponent {

    render() {
        const { contents } = this.props;

        return (
            <div className='bcd-welcome-banner btw-paper'>
                <Carousel showStatus={false} infiniteLoop={true}
                    autoPlay showArrows={false} showThumbs={false}>
                    {contents.map((content, index) => (
                        <div key={index}>
                            <Typography variant='body' lightColor>
                                Few tips before you start:
                            </Typography>
                            <SvgIcon name={content.img} />
                            <div className='content'>
                                <Typography variant='body' fontWeight='600' className='text'>
                                    {content.title}
                                </Typography>
                                <Typography variant='body' className='text'>
                                    {content.description}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </Carousel>
                <Button size='small' onClick={this.props.onGot} className='okay-button'>
                    Ok, got it!
                </Button>
            </div>
        )
    }
}

WelcomeBanner.propTypes = {
    onGot: PropTypes.func
};

WelcomeBanner.defaultProps = {
    contents: [
        {
            title: 'Earn points',
            description: 'Complete tasks by helping your friends and earn points.',
            img: 'banner-earn-point'
        },
        {
            title: 'Complete extra points tasks',
            description: 'Complete two special daily tasks and earn double of your usual points per task.',
            img: 'banner-extra-point'
        },
        {
            title: 'Move up the leaderboard',
            description: 'Become week’s top performer among all the Captains of your district.',
            img: 'banner-leaderboard'
        }
    ],
    onGot: () => { }
}

export default WelcomeBanner;