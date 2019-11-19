import React from 'react';

import { BaseComponent, Typography, SvgIcon } from '../../shared';

class PromoDescription extends BaseComponent {

    render() {
        return (
            <div className='bpp-promo-description'>
                <div className='main-part'>
                    <div className='description-part'>
                        <Typography className='description-left'>
                            Everybody should vote, particularly now. But many don’t.
                        </Typography>
                        <Typography className='description-left'>
                            We are a tool for activists to get more people to vote,
                             a community of people helping each other.
                        </Typography>
                    </div>
                    <div className='description-part'>
                        <Typography lightColor className='description-right'>
                            Some have good reasons, maybe are not sure how or where to find out how,
                            but many just don’t get it together.
                        </Typography>
                        <Typography lightColor className='description-right'>
                            The way to get everybody to vote is for those who are really dedicated
                            to voting to get their friends, particularly these should-be-voters to vote.
                            They are known and trusted and should responsibility to make it happen.
                        </Typography>
                        <Typography lightColor className='description-right'>
                            Many people don’t think much about elections, they don’t see that it has much
                            influence on their lives. No amount of broadcast messaging is likely to change that.
                            But all of those people know activists, people like you who really care about elections and voting.
                        </Typography>
                        <span className='find-out-more'>
                            <SvgIcon name='find-out-more' className='pr-2' />
                            Find Out More
                        </span>
                    </div>

                </div>
            </div>
        );
    }
}

export default PromoDescription;