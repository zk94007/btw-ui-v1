import React from 'react';
import PropTypes from 'prop-types';

import { getTaskScore } from '../../../utility/TaskUtility'
import { BaseComponent, Typography, SvgIcon, Button } from '../../shared';

class ExtraPointTask extends BaseComponent {

    render() {
        const { task: { taskName, subTasks }, color, onMark } = this.props;

        return (
            <div className={`bcd-task-item bcd-task-item-${color} btw-paper`}>
                <div className='item-content'>
                    <Typography variant='functional'>{taskName}</Typography>
                    <div className='task-status'>
                        <SvgIcon name='medal' className='svg-icon' />
                        <Typography variant='functional'>{getTaskScore(subTasks).score}</Typography>
                        <Button size='small' className='mark-button' color='white' onClick={onMark}>Mark as Done</Button>
                    </div>
                </div>
                <Button size='small' fullWidth className='footer-mark-button' color='white' onClick={onMark}>Mark as Done</Button>
            </div>
        );
    }
}

ExtraPointTask.propTypes = {
    task: PropTypes.object,
    color: PropTypes.oneOf(['light', 'dark']),
    onMark: PropTypes.func
};

ExtraPointTask.defaultProps = {
    color: 'light',
    onMark: () => { }
}

export default ExtraPointTask;