import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import classNames from 'classnames';

import { loadTaskList, updateTask } from '../../actions';
import { ActionItem, BaseComponent, Tabs, Spinner } from '../shared';
import { TaskEmpty, TaskDetail } from './index';
import routes from '../../constants/Routes';

class TasksManagement extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tabs: [
                {
                    id: 'allActions',
                    title: 'All actions'
                },
                {
                    id: 'notstarted',
                    title: 'Not started'
                },
                {
                    id: 'inprogress',
                    title: 'In progress'
                },
                {
                    id: 'completed',
                    title: 'Completed'
                }
            ],
            activeTabId: 'allActions',
            selectedTask: undefined
        };
    }

    componentWillMount() {
        this.props.actions.loadTaskList();
        const { tasks, history: { location: { state: { activeTab } = {} }}} = this.props;

        this.setState({
            selectedTask: tasks.length > 0 ? tasks[0] : undefined,
            activeTabId: activeTab || 'allActions'
        });

    }

    componentWillReceiveProps(props) {
        const { tasks } = props;
        if (!this.state.selectedTask) {
            this.setState({ selectedTask: tasks[0] });
        }
    }

    isEmptyOfSelectedTasks() {
        const { activeTabId } = this.state;
        const { tasks } = this.props;

        if (activeTabId === 'allActions') {
            return tasks.length === 0
        } else {
            return tasks.filter(({ status }) => status === activeTabId).length === 0;
        }
    }

    selectTabHandler = (activeTabId) => {
        const { tasks } = this.props;
        const selectedTask = tasks.filter(({ status }) => status === activeTabId || activeTabId === 'allActions')[0];

        this.setState({ activeTabId, selectedTask });
    };

    onSelectTaskHandler = (task) => {
        const { selectedTask, activeTabId } = this.state;
        const data = { ...selectedTask, status: 'inprogress' };

        if (selectedTask.status === 'notstarted') {
            this.props.actions.updateTask(selectedTask.taskId, selectedTask.taskId, data);
        }

        if (this.isMobileOnly()) {
            this.props.history.push({
                pathname: `${routes.taskDetail}`,
                state: { id: selectedTask._id, activeTab: activeTabId }
            })
        }

        this.setState({ selectedTask: task });
    };


    renderTaskList = () => {
        const { activeTabId, selectedTask } = this.state;
        const { tasks } = this.props;

        return tasks.filter(({ status }) => status === activeTabId || activeTabId === 'allActions')
            .map((task, index) => (
                <ActionItem
                    key={index}
                    task={task}
                    onSelectTask={this.onSelectTaskHandler}
                    className={classNames({ 'task-selected': task.taskId === selectedTask.taskId })} />));
    };

    renderTaskContent = () => {
        const { selectedTask } = this.state;
        if (!selectedTask) {
            return null;
        }

        return (
            <Row>
                <Col md={4} lg={5} className='task-list'>
                    {this.renderTaskList()}
                </Col>
                { !this.isMobileOnly() &&
                    <Col md={8} lg={7} >
                        <TaskDetail task={selectedTask} />
                    </Col> }
            </Row>
        )
    };

    renderEmptyTask = () => {
        return (
            <div className='task-empty'>
                <TaskEmpty />
            </div>
        )
    };

    render() {
        const { tabs, activeTabId } = this.state;
        const { isFetching } = this.props;

        return (
            <Container className='btw-task-list-page'>
                <Spinner loading={isFetching} />
                <Tabs tabs={tabs}
                    activeTabId={activeTabId}
                    onTabSelect={this.selectTabHandler}
                    className='actions-tabs' />
                {this.isEmptyOfSelectedTasks() ?
                    this.renderEmptyTask() :
                    this.renderTaskContent()}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { tasks, isFetching, isSuccess, error } = state.taskList;

    return {
        tasks,
        isFetching,
        isSuccess,
        error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ loadTaskList, updateTask }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TasksManagement));
