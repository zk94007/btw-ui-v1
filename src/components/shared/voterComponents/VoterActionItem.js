import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { BaseComponent, Typography, SvgIcon, Button } from '../index';
import { FORMAT } from '../../../constants/TimeConstants';

class VoterActionItem extends BaseComponent {

    clickMarkButtonHandler = () => {
        const { task, onMarkAsDone } = this.props;
        onMarkAsDone(task);
    }

    renderMarkButton = (device) => {
        const { task } = this.props;

        if (task.status !== 'completed') {
            return (
                <Button
                    size='small'
                    color='white'
                    fullWidth={device === 'mobile'}
                    className={`${device}-mark-action-button`}
                    onClick={this.clickMarkButtonHandler}>
                    Mark as Done
                </Button>
            )
        }
    }

    render() {
        const { task } = this.props;

        return (
            <div className='voter-action-item'>
                <div className='action-info'>
                    <div>
                        <Typography variant='body' className='action-name'>
                            {task.taskName}
                        </Typography>
                        <Typography variant='body' lightColor>
                            {moment(task.startDate).format(FORMAT)} – {moment(task.endDate).format(FORMAT)}
                        </Typography>
                    </div>
                    <div className='action-control'>
                        <SvgIcon name='medal' />
                        <Typography variant='functional' className='task-point'>{task.points || 0}</Typography>
                        {this.renderMarkButton('computer')}
                    </div>
                </div>
                {this.renderMarkButton('mobile')}
            </div>
        );
    }
}

VoterActionItem.propTypes = {
    task: PropTypes.object,
    onMarkAsDone: PropTypes.func
};

VoterActionItem.defaultProps = {
    task: {},
    onMarkAsDone: () => { }
}

export default VoterActionItem;