import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon } from '../index';

class PerformerStatusItem extends BaseComponent {

    render() {
        const { type, value } = this.props;
        const isPoint = type === 'point';

        return (
            <Typography variant='body' fontWeight='600' className='btw-performer-status-item'>
                <SvgIcon name={isPoint ? 'medal' : 'action-status-completed'} className='status-icon' />
                {value}
            </Typography>
        )
    }
}

PerformerStatusItem.propTypes = {
    type: PropTypes.oneOf(['point', 'task']),
    value: PropTypes.number
};

PerformerStatusItem.defaultProps = {
    type: 'point',
    value: 0
}

export default PerformerStatusItem;