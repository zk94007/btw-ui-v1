import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';

import colors from '../../../../constants/Colors';
import { BaseComponent } from '../../../shared';
import { ChartHeader, ChartFooter } from './index';

class PerformanceChart extends BaseComponent {

    getChartData = () => {
        const { performanceData: { main, previous } } = this.props;
        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        let data = [['', '', '']];

        days.map((day, index) => (
            data.push([day, main.data[index], previous.data[index]])
        ))

        return data;
    }

    render() {
        const chartData = this.getChartData();

        return (
            <div className='bcd-performance-chart btw-paper'>
                <ChartHeader {...this.props} />
                <Chart
                    height='205px'
                    chartType='Bar'
                    loader={<div>Loading Chart</div>}
                    data={chartData}
                    options={{
                        legend: { position: 'none' },
                        colors: [colors['primaryOpacity'], colors['primary']],
                    }}
                    className='chart-content'
                />
                <ChartFooter {...this.props} />
            </div>
        );
    }
}

PerformanceChart.propTypes = {
    performanceData: PropTypes.object
};

export default PerformanceChart;