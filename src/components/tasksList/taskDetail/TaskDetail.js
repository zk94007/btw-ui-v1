import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { BaseComponent, CongratsDialog, TaskCompleteDialog } from '../../shared';
import { TaskDetailHeader, TaskDetailContent } from './index';
import { updateTask } from '../../../actions';
import routes from '../../../constants/Routes';

class TaskDetail extends BaseComponent {
    constructor(props) {
        super(props);
        const { location: { state: { id } = {} } = {}, task } = props;
        if (!task && !id) {
            this.onLink(routes.tasksList);
        }
        this.state = {
            selectedSubTask: {},
            isMarkDialogShow: false,
            isCongratDialogShow: false
        };
    }

    onClickMarkOpenHandler = (selectedSubTask) => {
        this.setState({
            selectedSubTask,
            isMarkDialogShow: true
        })
    };

    completeTaskHandler = () => {
        const { task } = this.props;
        const { selectedSubTask } = this.state;
        const data = { ...task, status: 'completed' };

        this.props.actions.updateTask(task.taskId, selectedSubTask.taskId, data);
        this.setState({ isMarkDialogShow: false, isCongratDialogShow: true });
    };

    render() {
        const { task } = this.props;

        const { isMarkDialogShow, isCongratDialogShow, selectedSubTask } = this.state;
        return (
            <div className='btw-task-list-detail btw-paper'>
                { task &&
                    <>
                        <TaskDetailHeader task={task} />
                        <TaskDetailContent onMarkAsDone={this.onClickMarkOpenHandler}  {...this.props} />
                    </>
                }
                { isMarkDialogShow && <TaskCompleteDialog show={isMarkDialogShow}
                                    selectedSubTask={selectedSubTask}
                                    onClose={() => this.setState({ isMarkDialogShow: false })}
                                    onMarkAsDone={this.completeTaskHandler} /> }
                { isCongratDialogShow && <CongratsDialog show={isCongratDialogShow}
                                onClose={() => this.setState({ isCongratDialogShow: false })}/> }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const { location: { state: { id } = {} } = {}, task } = props;
    const { tasks = []} = state.taskList || {};


    return {
        task: task || tasks.find(task => task._id === id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ updateTask }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskDetail));

