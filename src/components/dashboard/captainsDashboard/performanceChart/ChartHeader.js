import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BaseComponent, Typography, SvgIcon } from '../../../shared';

class ChartHeader extends BaseComponent {

    renderDateItem = (data, isMain = true) => {
        return (
            <div className='date-item'>
                <p className={classNames('date-sign', { 'main-sign': isMain })} />
                <Typography
                    variant='functional'
                    lightColor={!isMain}>
                    {data.startDate} - {data.endDate}
                </Typography>
                {isMain && <i className='fa fa-sort-desc' />}
            </div>
        )
    }

    renderTitle = () => {
        return (
            <div className='title-content'>
                <SvgIcon name='bar-chart' />
                <Typography variant='body' className='chart-title'>
                    Your weekly perfomance
                </Typography>
            </div>
        )
    }

    render() {
        const { performanceData: { main, previous } } = this.props;

        return (
            <div className='bcd-chart-header'>
                {this.renderTitle()}
                <div className='date-content'>
                    {this.renderDateItem(main)}
                    {this.renderDateItem(previous, false)}
                </div>
            </div>
        )
    }
}

ChartHeader.propTypes = {
    performanceData: PropTypes.object
};

export default ChartHeader;