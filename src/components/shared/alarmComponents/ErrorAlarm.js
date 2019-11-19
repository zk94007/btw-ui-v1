import React from 'react';
import classNames from 'classnames';

import { BaseComponent, Typography } from '../index';

class ErrorAlarm extends BaseComponent {

    getChildren = () => {
        const { error, children } = this.props;
        return error
                ? <Typography variant='body' lightColor>{ error }</Typography>
                : children;
    };

    render() {
        const { className, showTop = false, hide = false } = this.props;

        return !hide && (
            <div className={classNames('btw-paper btw-error-alarm', className, { 'btw-error-outer': showTop })}>
                { this.getChildren() }
            </div>
        );
    }
}

export default ErrorAlarm;