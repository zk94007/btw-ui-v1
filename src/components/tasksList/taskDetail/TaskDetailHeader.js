import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getTaskScore } from '../../../utility/TaskUtility'
import { BaseComponent, Typography, SvgIcon } from '../../shared';
import { resolveStatus } from '../helper';

class TaskDetailHeader extends BaseComponent {

    render() {
        const { task: { subTasks = [], status } = {} } = this.props;
        const { total, score } = getTaskScore(subTasks);
        const isCompleted = status === 'completed';
        const statusText = resolveStatus(status);

        return (
            <div className={classNames('btw-task-detail-header', { 'completed-header': isCompleted })}>
                <div className='status-text'>
                    <SvgIcon name={isCompleted ? 'action-status-completed' : 'action-status-inprogress'} />
                    <Typography
                        lightColor
                        variant='functional'
                        className={classNames('status-title', { 'completed-text': isCompleted })}>
                        { statusText }
                    </Typography>
                </div>
                <div className={'status-content'}>
                    <Typography
                        lightColor
                        variant='functional'
                        className={classNames({ 'completed-text': isCompleted })}>
                        Points earned:
                    </Typography>
                    <SvgIcon name='medal' className='medal-icon' />
                    <Typography
                        lightColor
                        variant='functional'
                        className={classNames({ 'completed-text': isCompleted })}>
                        {score} / {total}
                    </Typography>
                </div>
            </div >
        );
    }
}

TaskDetailHeader.propTypes = {
    task: PropTypes.object
};

export default TaskDetailHeader;