import React from 'react';

import { BaseComponent, SvgIcon, Typography } from '../shared';

class TaskEmpty extends BaseComponent {

    render() {
        return (
            <div className='btw-task-list-empty'>
                <SvgIcon name='task-empty' />
                <Typography lightColor className='title'>Hey! It's empty here.</Typography>
                <Typography lightColor variant='body'>
                    Looks like you don’t have any actions available for now.
                </Typography>
            </div>
        )
    }
}

export default TaskEmpty;