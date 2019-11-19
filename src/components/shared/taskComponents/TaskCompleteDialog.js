import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { updateTask } from '../../../actions';
import { BaseComponent, Button, Dialog, Typography, StatusIcon, VoterAvatar, SocialList, CommentItem, CommentEditor } from '../index';
import { ComingSoon } from '../voterComponents';

class TaskCompleteDialog extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentComment: {
                text: '',
                images: []
            },
            comments: [],
            currentIndex: -1
        }
    }

    componentDidMount() {
        const { selectedSubTask: { comments = [] } } = this.props;
        this.setState({ comments });
    }

    onMarkAsDone = () => {
        this.props.onMarkAsDone()
    }

    onSelectComment = (index, comment) => () => {
        this.setState({ currentIndex: index, currentComment: comment });
    }

    onDeleteComment = index => () => {
        let { comments } = this.state;
        comments = [...comments.slice(0, index), ...comments.slice(index + 1)];
        this.updateTaskHandler(comments);
    }

    onSaveComment = currentComment => {
        let { comments, currentIndex } = this.state;

        if (currentIndex < 0) {
            comments = [...comments, { ...currentComment, createdAt: moment() }];
        } else {
            comments[currentIndex].text = currentComment.text;
            comments[currentIndex].images = currentComment.images;
        }
        this.updateTaskHandler(comments);
    }

    onCancelComment = () => {
        this.setState({ currentIndex: -1, currentComment: { text: '', images: [] } });
    }

    updateTaskHandler = (comments) => {
        let { selectedSubTask, isVoterTask } = this.props;
        const { parentTaskId, taskId } = selectedSubTask;
        selectedSubTask.comments = comments;

        this.props.actions.updateTask(parentTaskId, taskId, selectedSubTask, isVoterTask);
        this.onCancelComment();
        this.setState({ comments });
    }

    renderActionButton = () => {
        return (
            <Button fullWidth onClick={this.onMarkAsDone}>Mark as Done</Button>
        );
    }

    renderVoter = () => {
        const { selectedSubTask: { voterDetails = {} } } = this.props;

        return (
            <div className='voter-content'>
                <VoterAvatar
                    src={voterDetails.src}
                    firstname={voterDetails.firstname}
                    lastname={voterDetails.lastname}
                    status={voterDetails.voterStatus} />
                <div className='voter-info'>
                    <Typography variant='body' fontWeight='600'>
                        {voterDetails.firstname} {voterDetails.lastname}
                    </Typography>
                    <Typography variant='functional' lightColor>
                        {`${voterDetails.gender} | ${voterDetails.lastname}`}
                    </Typography>
                    <div className='voter-status'>
                        <StatusIcon type={voterDetails.voterStatus} className='social-icon' />
                        <SocialList social={voterDetails.socialNetwork} showVoterFile />
                    </div>
                </div>
            </div >
        )
    }

    renderSubTaskInfo = () => {
        const { selectedSubTask: { voterDetails = {} } } = this.props;

        return (
            <div className='task-info'>
                <Typography variant='body' lightColor className='description-part'>
                    Communicate and encourage {voterDetails.firstname} {voterDetails.lastname} to register for voting.
                </Typography>
                <Typography variant='body' lightColor className='view-profile-part'>
                    To find out some personalised tips on how to communicate your
                    purpose to this particular voter better.
                </Typography>
                <ComingSoon />
                {this.renderVoter()}
            </div>
        )
    }

    renderComments = () => {
        const { currentComment, currentIndex, comments = []} = this.state;
        const { selectedSubTask: { voterDetails } } = this.props;

        return (
            <div className='comments-content'>
                <Typography variant='body' fontWeight='600' className='title'>
                    {`Updates (${comments.length})`}
                </Typography>
                {comments.map((comment, index) => (
                    <CommentItem
                        key={index}
                        comment={comment}
                        voter={voterDetails}
                        onEdit={this.onSelectComment(index, comment)}
                        onDelete={this.onDeleteComment(index, comment)} />
                ))}
                <CommentEditor
                    isAdd={currentIndex < 0}
                    voter={voterDetails}
                    comment={currentComment}
                    onCancel={this.onCancelComment}
                    onSave={this.onSaveComment} />
            </div>
        )
    }

    render() {
        const { show, onClose, selectedSubTask } = this.props;

        return (
            <Dialog className='btw-task-complete-dialog'
                show={show}
                title={`Task : ${selectedSubTask.taskName}`}
                closeButton
                actionButtons={this.renderActionButton()}
                onClose={onClose}>
                {this.renderSubTaskInfo()}
                {this.renderComments()}
            </Dialog>
        )
    }
}

TaskCompleteDialog.propTypes = {
    show: PropTypes.bool,
    isVoterTask: PropTypes.bool,
    selectedSubTask: PropTypes.object,
    onClose: PropTypes.func,
    onMarkAsDone: PropTypes.func
};

TaskCompleteDialog.defaultProps = {
    show: true,
    isVoterTask: false,
    selectedSubTask: {},
    onClose: () => { },
    onMarkAsDone: () => { }
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ updateTask }, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(withRouter(TaskCompleteDialog));