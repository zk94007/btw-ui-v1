import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';

import { getCompletedTasksCount, getTaskScore } from '../../../utility/TaskUtility'
import { BaseComponent, Typography, TaskProgressBar, SvgIcon, Paper } from '../index';
import { FORMAT } from '../../../constants/TimeConstants';
import { resolveStatus } from '../../tasksList/helper';

class ActionItem extends BaseComponent {

    handleClick = () => {
        this.props.onSelectTask(this.props.task);
    };

    renderHeader = () => {
        const { task: { subTasks, status } } = this.props;
        const { total, score } = getTaskScore(subTasks);
        const statusText = resolveStatus(status);
        const isCompleted  = status === 'completed';


        return (
            <div className='action-header'>
                <div className='action-status'>
                    <SvgIcon name={isCompleted ? 'action-status-completed' : 'action-status-inprogress'} />
                    <Typography className='status-text' variant='functional' lightColor>
                        { statusText }
                    </Typography>
                </div>

                <div className='action-points'>
                    <SvgIcon name='medal' />
                    <Typography className='points-text' variant='functional' lightColor>
                        {score} / {total}
                    </Typography>
                </div>
            </div>
        )
    }

    render() {
        const { task, className } = this.props

        return (
            <Paper className={cn(className, 'btw-action-item')}>
                <div onClick={this.handleClick}>
                    {this.renderHeader()}
                    <Typography className='action-title' variant='functional'>
                        {task.taskName}
                    </Typography>
                    <Typography className='action-duration' lightColor variant='functional'>
                        {moment(task.startDate).format(FORMAT)} – {moment(task.endDate).format(FORMAT)}
                    </Typography>
                    <TaskProgressBar total={task.subTasks.length}
                        completedNumber={getCompletedTasksCount(task.subTasks)}
                    />
                    <Typography className='task-done' lightColor variant='functional'>
                        Tasks done: {getCompletedTasksCount(task.subTasks)} / {task.subTasks.length}
                    </Typography>
                </div>
            </Paper>
        );
    }
}

ActionItem.defaultProps = {
    task: {},
    onSelectTask: () => { }
};

ActionItem.propTypes = {
    // action task
    task: PropTypes.object.isRequired,

    //click event
    onSelectTask: PropTypes.func.isRequired,

};

export default ActionItem;