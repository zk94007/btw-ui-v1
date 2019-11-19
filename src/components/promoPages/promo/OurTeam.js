import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import { BaseComponent, Typography, SvgIcon } from '../../shared';
import MarkMullenAvatar from '../../../resources/avatar/mark-mullen.svg';
import KennethObikweluAvatar from '../../../resources/avatar/kenneth-obikwelu.svg';
import VolunteerAvatar from '../../../resources/avatar/volunteer.svg';
import BackgroundImage from '../../../resources/background/avatar-background.svg';

class OurTeam extends BaseComponent {

    renderButtons = () => {
        return (
            <>
                <SvgIcon
                    name='carousel-arrow-left'
                    onClick={() => this.Carousel.slidePrev()}
                    className='prev-btn' />
                <SvgIcon
                    name='carousel-arrow-right'
                    onClick={() => this.Carousel.slideNext()}
                    className='next-btn' />
            </>
        )
    }

    render() {
        const { contents, responsive } = this.props;

        return (
            <div className='bpp-our-team'>
                <Typography variant='body' fontWeight='600' className='ourteam-title'>
                    Our Team
                </Typography>
                <AliceCarousel
                    mouseDragEnabled
                    autoPlay
                    autoPlayInterval={5000}
                    fadeOutAnimation
                    responsive={responsive}
                    buttonsDisabled={true}
                    ref={(el) => (this.Carousel = el)} >
                    {contents.map((content, index) => (
                        <div key={index} className='carousel-content'>
                            <div className='member-avatar'>
                                <img src={content.avatar} alt='' />
                                <img
                                    src={BackgroundImage}
                                    className={`background-img-${index % 2 === 0 ? 'odd' : 'even'}`}
                                    alt='' />
                            </div>
                            <Typography className='member-name'>
                                {content.name}
                            </Typography>
                            <Typography className='member-role'>
                                {content.role}
                            </Typography>
                            {content.descriptions.map((description, index) => (
                                <Typography key={index} lightColor className='member-description'>
                                    {description}
                                </Typography>
                            ))}
                        </div>
                    ))}
                </AliceCarousel>
                {this.renderButtons()}
            </div>
        )
    }
}

OurTeam.defaultProps = {
    contents: [
        {
            avatar: MarkMullenAvatar,
            name: 'Mark Mullen',
            role: 'Director',
            descriptions: [
                "Mark has worked extensively in assisting populations peacefully promote social and political change. He has lived in and set up mission-driven efforts in Malawi, Palestine and the Republic of Georgia.",
                "He worked for eleven years with the National Democratic Institute and later set up the Georgia chapter of Transparency International, the international anti-corruption network.",
                "During the transition to democracy in Georgia  'The Rose Revolution', Mark mobilized students and activists and proposed the idea of giving roses as a symbol of non-violent opposition."
            ]
        },
        {
            avatar: KennethObikweluAvatar,
            name: 'Kenneth Obikwelu',
            role: 'Chief Technology Officer',
            descriptions: [
                "Kenneth is an engineer with over 8 years of experience in application product delivery across multiple business domains. For the past three years, he has been working as an application quality delivery consultant to Kaiser Permanente.",
                "He loves to leverage technology to solve real-world problems. He received a Bachelor’s in Electrical/Electronics Engineering and a Master’s in Information Technology."
            ]
        },
        {
            avatar: VolunteerAvatar,
            name: 'Katie Long',
            role: 'Volunteer',
            descriptions: [
                "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
                "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
            ]
        },
        {
            avatar: VolunteerAvatar,
            name: 'Jad DeFanti',
            role: 'Volunteer',
            descriptions: [
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "Many desktop publishing packages and web page editors now use It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
            ]
        }
    ],
    responsive: {
        0: { items: 1 },
        992: { items: 2 }
    }
}

export default OurTeam;