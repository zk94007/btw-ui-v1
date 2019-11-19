import React from 'react';
import PropTypes from 'prop-types';
import ReadMoreAndLess from 'react-read-more-less';
import moment from 'moment';

import { getCompletedTasksCount } from '../../../utility/TaskUtility';
import { BaseComponent, Typography, SubTaskItem } from '../../shared';
import { FORMAT } from '../../../constants/TimeConstants';

class TaskDetailContent extends BaseComponent {

    renderTaskInfo = () => {
        const { task = {}} = this.props;

        return (
            <div className='task-info'>
                <Typography>{task.taskName}</Typography>
                <Typography variant='body' lightColor className='task-duration'>
                    {moment(task.startDate).format(FORMAT)} – {moment(task.endDate).format(FORMAT)}
                </Typography>
                <ReadMoreAndLess charLimit={250}
                    readMoreText=' Read more'
                    readLessText=' Read less'>
                    {task.taskDescription}
                </ReadMoreAndLess>
            </div>
        );
    }

    renderProgressTaskList = () => {
        const { task: { subTasks = [] } = {}, onMarkAsDone } = this.props;

        if (getCompletedTasksCount(subTasks) !== subTasks.length) {

            return (
                <div className='subtask-contents'>
                    <Typography variant='body' fontWeight='600' className='subtask-title'>
                        Active tasks ({subTasks.length - getCompletedTasksCount(subTasks)})
                    </Typography>
                    {
                        subTasks.filter((subTask) => subTask.status === 'inprogress' || subTask.status === 'notstarted')
                            .map((subTask, index) => (
                                <SubTaskItem
                                    key={index}
                                    subTask={subTask}
                                    onMarkAsDone={onMarkAsDone} />
                            ))
                    }
                </div>
            );
        }
    }

    renderCompletedTaskList = () => {
        const { task: { subTasks = [] } = {}} = this.props;

        if (getCompletedTasksCount(subTasks) !== 0) {
            return (
                <div className='subtask-contents'>
                    <Typography variant='body' fontWeight='600' className='subtask-title'>
                        Done tasks ({getCompletedTasksCount(subTasks)})
                    </Typography>
                    {
                        subTasks.filter((subTask) => subTask.status === 'completed')
                            .map((subTask, index) => (
                                <SubTaskItem
                                    key={index}
                                    subTask={subTask} />
                            ))
                    }
                </div>
            );
        }
    }

    render() {
        return (
            <div className='btw-task-detail-content'>
                {this.renderTaskInfo()}
                {this.renderProgressTaskList()}
                {this.renderCompletedTaskList()}
            </div >
        );
    }
}

TaskDetailContent.propTypes = {
    task: PropTypes.object,
    onMarkAsDone: PropTypes.func
};

export default TaskDetailContent;