import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { BaseComponent, Button, Typography, SocialList } from '../index';

class SocialInfo extends BaseComponent {

    render() {
        const { social, onSocialConnect, noConnect, className } = this.props;
        const size = noConnect ? 'large' : 'medium';

        return (
            <div className={classNames('btw-social-info', noConnect ? 'btw-social-info-no-connect' : 'btw-paper', className)}>
                <SocialList social={social} size={size} />
                <div className='info-content'>
                    <Typography className='title'>
                        Connect social media accounts
                    </Typography>
                    <Typography variant='body' lightColor className='description'>
                        {noConnect ?
                            'We will use your accounts information only to connect you with voters you already know in real life. This can make your serching process much easier.' :
                            'With connected social media accounts, it is much easier to find voters that you already know in real life.'
                        }
                    </Typography>
                </div>
                <Button
                    className='connect-button'
                    onClick={onSocialConnect}
                    color='white'>
                    Connect
                </Button>
            </div>
        );
    }
}

SocialInfo.propTypes = {
    social: PropTypes.object,
    noConnect: PropTypes.bool,
    onSocialConnect: PropTypes.func
};

SocialInfo.defaultProps = {
    noConnect: false
}

export default SocialInfo;
