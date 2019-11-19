import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from 'react-router-dom'

import { getCompletedTasksCount } from '../../../utility/TaskUtility';
import { getTaskListByVoter, updateTask } from '../../../actions';
import { BaseComponent, Typography, SvgIcon, CongratsDialog, TaskCompleteDialog, Spinner } from '../index';
import { VoterActionItem } from './index';

class VoterAction extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedTask: {
                comments: []
            },
            isMarkDialogShow: false,
            isCongratDialogShow: false
        };
    }

    componentDidMount() {
        const { selectedVoter, actions } = this.props;
        actions.getTaskListByVoter(selectedVoter.id);
    }

    componentDidUpdate(prevProps) {
        const { selectedVoter, actions } = this.props;
        if (prevProps.selectedVoter.id !== selectedVoter.id && !selectedVoter.tasksLoaded) {
            actions.getTaskListByVoter(selectedVoter.id);
        }
    }

    onClickMarkOpenHandler = (selectedTask) => {
        this.setState(prevState => ({
            selectedTask: { ...prevState.selectedTask, ...selectedTask },
            isMarkDialogShow: true
        }));
    }

    completeTaskHandler = async () => {
        const { selectedTask } = this.state;
        const data = { ...selectedTask, status: 'completed' };
        const { parentTaskId, taskId } = selectedTask;

        await this.props.actions.updateTask(parentTaskId, taskId, data, true);
        this.setState({ isMarkDialogShow: false, isCongratDialogShow: true });
    }

    renderContentHeader = (status) => {
        return (
            <div className='action-header'>
                <SvgIcon name={status === 'completed' ? 'action-status-completed' : 'action-status-inprogress'} />
                <Typography variant='body' className='action-status'>{status === 'completed' ? 'Done' : 'Active'}</Typography>
            </div>
        );
    }

    renderProgressTaskList = () => {
        const { selectedVoter: { tasks }} = this.props;

        if (getCompletedTasksCount(tasks) !== tasks.length) {
            return (
                <div className='task-contents'>
                    {this.renderContentHeader('inprogress')}
                    {
                        tasks.filter((task) => task.status !== 'completed')
                            .map((task, index) => (
                                <VoterActionItem
                                    task={task}
                                    key={index}
                                    onMarkAsDone={this.onClickMarkOpenHandler} />
                            ))
                    }
                </div>
            );
        }
    }

    renderCompletedTaskList = () => {
        const { selectedVoter: { tasks }} = this.props;

        if (getCompletedTasksCount(tasks) !== 0) {
            return (
                <div className='subtask-contents'>
                    {this.renderContentHeader('completed')}
                    {
                        tasks.filter((task) => task.status === 'completed')
                            .map((task, index) => (
                                <VoterActionItem
                                    task={task}
                                    key={index} />
                            ))
                    }
                </div>
            );
        }
    }

    render() {
        const { selectedVoter: { tasks = [] }, isFetching } = this.props;
        const { selectedTask, isCongratDialogShow, isMarkDialogShow } = this.state;

        if (tasks.length === 0) return null;

        return (
            <div className='btw-voter-action'>
                <Spinner loading={isFetching} />
                <Typography className='title'>
                    Actions with this voter
                </Typography>
                {this.renderProgressTaskList()}
                {this.renderCompletedTaskList()}
                {
                    isMarkDialogShow &&
                    <TaskCompleteDialog show={isMarkDialogShow}
                        selectedSubTask={selectedTask}
                        onClose={() => this.setState({ isMarkDialogShow: false })}
                        onMarkAsDone={this.completeTaskHandler}
                        isVoterTask={true} />
                }
                {
                    isCongratDialogShow &&
                    <CongratsDialog show={isCongratDialogShow}
                        onClose={() => this.setState({ isCongratDialogShow: false })}
                    />
                }
            </div>
        );
    }
}

VoterAction.propTypes = {
    selectedVoter: PropTypes.object
};

const mapStateToProps = (state) => {
    const { isFetching, isSuccess, error } = state.voterList;
    return {
        isFetching,
        isSuccess,
        error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getTaskListByVoter, updateTask }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterAction));