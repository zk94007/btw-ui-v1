import React from 'react';
import classNames from 'classnames';

import { BaseComponent, Typography, SvgIcon } from '../index';

class CongratsAlarm extends BaseComponent {
    render() {
        const { children, className } = this.props;

        return (
            <div className={classNames('btw-congrats-alarm', className)}>
                <Typography className='congrats-title'>
                    Congrats!
                </Typography>
                {children}
                <SvgIcon name='circle' className='ellipse-large' />
                <SvgIcon name='circle' className='ellipse-small' />
            </div>
        );
    }
}

export default CongratsAlarm;