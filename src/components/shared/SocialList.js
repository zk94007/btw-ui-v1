import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SocialIcon, BaseComponent, SvgIcon } from './index';

class SocialList extends BaseComponent {

    render() {
        const { social = {}, size, className } = this.props;
        const isLarge = size === 'large';

        return (
            <div className={classNames('btw-social-list', { 'social-list-large': isLarge }, className)}>
                {social.showVoterFile &&
                    <SvgIcon name='voter-list-file' size={size} className='voter-file' />
                }
                <SocialIcon name='twitter' visible={social.twitter} size={size} />
                <SocialIcon name='google' visible={social.google} size={size} />
            </div>
        );
    }
}

SocialList.propTypes = {
    social: PropTypes.object,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

SocialList.defaultProps = {
    size: 'small'
}

export default SocialList;
