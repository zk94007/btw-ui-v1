import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import { Icon, BaseComponent, PopoverKeepOnHover, ButtonLink } from '../shared';

class SocialIcon extends BaseComponent {

    getIconHeight = (size) => {

        switch (size) {
            case 'small':
                return 8;
            case 'medium':
                return 12;
            case 'large':
                return 20;
            default:
                return null;
        }
    }

    renderPopover = (name) => {
        return (
            <div className='btw-social-popup'>
                You are friends with <br/> <ButtonLink href='#/' label='Sudie Sears' className='social-user-link' /> on <br/> {_.upperFirst(name)}.
            </div>
        )        
    }

    renderIcon = (name, iconSizeClass, visible, height, enable) => {

        return (
            <PopoverKeepOnHover component={this.renderPopover(name)}>
                <div className={classNames('btw-social-icon', iconSizeClass, visible ? name : { 'social-icon-default': enable })} >
                    {enable && <Icon name={`${name}-${visible ? 'light' : 'grey'}`} height={height} />}
                </div >
            </PopoverKeepOnHover>
        );
    }

    render() {
        const { name, visible, size } = this.props;
        const height = this.getIconHeight(size);
        const enable = visible || size !== 'small';

        return this.renderIcon(name, `social-icon-${size}`, visible, height, enable);
    }

}
SocialIcon.propTypes = {
    name: PropTypes.string,
    visible: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

SocialIcon.defaultProps = {
    size: 'small'
}

export default SocialIcon;
