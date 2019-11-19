import TaskConstants from '../constants/reducerConstants/TaskConstants';
import taskService from '../services/TaskService';
import authStorage from '../storage/AuthStorage';

import { loadVoterList } from './VoterListActions';

export function loadTaskList() {
    return (dispatch, getState) => {
        dispatch(actionRequest());
        const { id } = authStorage.getLoggedUser();

        return taskService.loadTaskList(id).then(
            response => {
                if (!response.message) {
                    const { voterList: { voters }} = getState();

                    if (voters.length !== 0) {
                        dispatch(loadTasksSuccess(getTasksWithVoters(response, voters)));
                    } else {
                        dispatch(loadVoterList(voters => {
                            dispatch(loadTasksSuccess(getTasksWithVoters(response, voters)));
                        }));
                    }
                } else {
                    dispatch(loadTasksSuccess([]));
                }
            },
            error => {
                dispatch(actionError(error.data.message));
            });
    };

    function actionRequest() {
        return { type: TaskConstants.TASK_LIST_REQUEST };
    }

    function loadTasksSuccess(data) {
        return { type: TaskConstants.TASK_LIST_SUCCESS, data };
    }

    function actionError(error) {
        return { type: TaskConstants.TASK_LIST_ERROR, error };
    }
}

export function updateTask(groupTaskId, taskId, data, isVoterTask) {

    return dispatch => {
        dispatch(actionRequest());
        return taskService.updateTask(taskId, data).then(
            response => {
                let tasks;
                if (isVoterTask) {
                    tasks = dispatch(getVoterTaskList(taskId, data))
                } else {
                    tasks = dispatch(getTaskList(groupTaskId, taskId, data));
                }
                dispatch(updateTaskSuccess(tasks));
            },
            error => {
                dispatch(updateTaskError(error.data.message));
            });
    };

    function actionRequest() {
        return { type: TaskConstants.UPDATE_TASK_REQUEST };
    }

    function updateTaskSuccess(data) {
        return { type: TaskConstants.UPDATE_TASK_SUCCESS, data };
    }

    function updateTaskError(error) {
        return { type: TaskConstants.UPDATE_TASK_ERROR, error };
    }
}

const getTasksWithVoters = (tasks, voters) => {
    const mapVoters = new Map(voters.map(voter => ([ voter._id, voter ])));
    tasks.forEach(task => {
        const { subTasks, ...taskData } = task;

        task.subTasks.forEach(subTask => {
            subTask.voterDetails = mapVoters.get(subTask.voterId) || {};
        });
        task.subTasks.unshift({
            ...taskData,
            ...{ parentTaskId: task.taskId, voterDetails: mapVoters.get(task.voterId) || {} }
        });
    });
    return tasks;
};

const getTaskList = (groupTaskId, taskId, data) => (dispatch, getState) => {
    let { taskList: { tasks } } = getState();
    const groupTaskIndex = tasks.findIndex(task => (task.taskId === groupTaskId));

    let groupTask = tasks[groupTaskIndex];
    const subTaskIndex = groupTask.subTasks.findIndex(task => (task.taskId === taskId));

    if (groupTaskId !== taskId) {
        groupTask.subTasks[subTaskIndex] = data;
    } else {
        groupTask = {...groupTask, ...data };
    }

    tasks[groupTaskIndex] = groupTask;
    return tasks;
};

const getVoterTaskList = (taskId, data) => (dispatch, getState) => {

    let { voterList: { tasks } } = getState();
    const taskIndex = tasks.findIndex(task => (task.taskId === taskId));

    tasks[taskIndex] = data;
    return tasks;
}
