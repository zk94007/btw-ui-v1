import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon } from '../../shared';

class DashboardUserInfo extends BaseComponent {

    renderItem = (label, value, isPoint = false) => {
        return (
            <div className='info-item'>
                <Typography lightColor variant='body'>{label}:</Typography>
                <Typography className='info-value'>
                    {isPoint && <SvgIcon name='medal' className='svg-icon' />}
                    {value}
                </Typography>
            </div>
        );
    }

    render() {
        const { user, activeTasks, voterCounts } = this.props;

        return (
            <div className='bcd-user-info'>
                {this.renderItem('Current level', user.role)}
                {this.renderItem('Points balance', user.points, true)}
                {this.renderItem('Active tasks', activeTasks)}
                {this.renderItem('Your voters', voterCounts)}
            </div>
        );
    }
}

DashboardUserInfo.propTypes = {
    user: PropTypes.object
};

export default DashboardUserInfo;