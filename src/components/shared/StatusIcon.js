import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BaseComponent, Typography } from '../shared';

class StatusIcon extends BaseComponent {

    getClassName = (type) => {

        switch (type) {
            case 'TEMPORARY':
                return 'status-icon-infrequent';
            case 'ACTIVE':
                return 'status-icon-regular';
            case 'INACTIVE' || 'DENIED' || 'REMOVED':
                return 'status-icon-not-registered';
            default:
                return null;
        }
    }

    render() {
        let { type } = this.props;
        const { noBorder, className } = this.props;
        type = type || 'INACTIVE';

        return (
            <Typography
                displayInline
                variant='functional'
                className={classNames('btw-status-icon', this.getClassName(type), { 'status-icon-no-border': noBorder }, className)}>
                {type || 'INACTIVE'}
            </Typography>
        );
    }
}

StatusIcon.propTypes = {
    type: PropTypes.oneOf(['ACTIVE', 'INACTIVE', 'DENIED', 'REMOVED', 'TEMPORARY']),
    noBorder: PropTypes.bool
};

StatusIcon.defaultProps = {
    type: 'INACTIVE',
    noBorder: false
}

export default StatusIcon;
