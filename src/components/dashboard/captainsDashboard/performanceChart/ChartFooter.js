import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BaseComponent, Typography, SvgIcon } from '../../../shared';

class ChartFooter extends BaseComponent {

    renderStatus = (data, isPoint = true) => {
        return (
            <div className={classNames('perform-status', { 'point-status': isPoint })}>
                <Typography className='point-value'>
                    {data.value}
                </Typography>
                <Typography
                    variant='functional'
                    className='point-value'>
                    {isPoint ? 'Points Earned' : 'Tasks Done'}
                </Typography>
                <div className='perform-percent'>
                    <SvgIcon name={data.isUp ? 'up-arrow' : 'down-arrow'} className='arrow' />
                    <Typography
                        variant='functional'
                        className='point-value'>
                        {`${data.percent}%`}
                    </Typography>
                </div>
            </div>
        )
    }

    render() {
        const { performanceData: { points, activeTasks } } = this.props;

        return (
            <div className='bcd-chart-footer'>
                {this.renderStatus(points)}
                {this.renderStatus(activeTasks, false)}
            </div>
        )
    }
}

ChartFooter.propTypes = {
    performanceData: PropTypes.object
};

export default ChartFooter;