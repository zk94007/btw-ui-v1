/**
 * usage : <TaskProgressBar total={5} completedNumber={3} color='primary'/>
 * create at: 2019/06/14
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import colors from '../../../constants/Colors';
import { BaseComponent } from '../index';

class TaskProgressBar extends BaseComponent {
    render() {
        const { total, completedNumber, color } = this.props
        const percent = completedNumber / total * 100;

        return (
            <div className={cn('btw-task-progress')}>
                <div className={cn('btw-task-progress-bar')} style={{ backgroundColor: colors[color], width: percent + '%' }}></div>
            </div>
        )
    }
}

TaskProgressBar.defaultProps = {
    total: 1,
    completedNumber: 0,
    color: 'primary',
};

TaskProgressBar.propTypes = {
    //Number of Total tasks
    total: PropTypes.number.isRequired,
    // Number of completed tasks
    completedNumber: PropTypes.number.isRequired,
    //ProgressBar color : error, alert, primary
    color: PropTypes.string
};

export default TaskProgressBar;