import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
    BaseComponent,
    Button,
    SocialList,
    StatusIcon, SvgIcon, Typography, VoterAvatar
} from '../index';

class SubTaskItem extends BaseComponent {

    renderVoter = () => {
        const { subTask: { voterDetails= {}}} = this.props;

        return (
            <div className='voter-info' >
                <VoterAvatar
                    src={voterDetails.src}
                    firstname={voterDetails.firstname}
                    lastname={voterDetails.lastname}
                    status={voterDetails.voterStatus} />
                <div className='voter-detail'>
                    <Typography
                        variant='body'
                        fontWeight='600'
                        className='voter-name'>
                        {voterDetails.firstname} {voterDetails.lastname}
                    </Typography>
                    <div className='voter-social'>
                        <StatusIcon type={voterDetails.voterStatus || 'INACTIVE'} noBorder />|
                        <SocialList social={voterDetails.socialNetwork || {}} className='voter-status' />
                    </div>
                </div>
            </div>
        );
    };

    renderSubTask = () => {
        const { subTask, hideSubTask, onMarkAsDone } = this.props;

        if (!hideSubTask) {
            return (
                <div className='sub-task-info'>
                    <SvgIcon name='medal' />
                    <Typography variant="functional">{subTask.points}</Typography>
                    { subTask.status !== 'completed' &&
                        <Button
                            size='small'
                            color='white'
                            className='mark-button'
                            onClick={() => onMarkAsDone(subTask)}>
                            Mark as Done
                        </Button>
                    }
                </div>
            )
        }
    };

    render() {
        const { subTask, status, hideSubTask, onMarkAsDone } = this.props;

        return (
            <div className={classNames('btw-subtask-item', { 'completed-subtask': status, 'hide-subtask': hideSubTask })}>
                <div className='item-content'>
                    {this.renderVoter()}
                    {this.renderSubTask()}
                </div>
                { subTask.status !== 'completed' &&
                    <Button
                        size='small'
                        color='white'
                        className='footer-mark-button'
                        fullWidth
                        onClick={() => onMarkAsDone(subTask)}>
                        Mark as Done
                    </Button>
                }
            </div>
        )
    }
}

SubTaskItem.propTypes = {
    subTask: PropTypes.object,
    status: PropTypes.number,
    hideSubTask: PropTypes.bool,
    onMarkAsDone: PropTypes.func
};

SubTaskItem.defaultProps = {
    status: 0,
    hideSubTask: false,
    onMarkAsDone: () => { }
};

export default SubTaskItem;