import TaskConstants from '../constants/reducerConstants/TaskConstants';
import InitialState from '../constants/InitialState';

export default function taskListReducer(state = InitialState.taskList, action) {
    switch (action.type) {
        case TaskConstants.TASK_LIST_REQUEST: {
            return { ...state, isFetching: true };
        }
        case TaskConstants.TASK_LIST_SUCCESS: {
            return { ...state, ...{ tasks: action.data, isFetching: false, isSuccess: true } };
        }
        case TaskConstants.TASK_LIST_ERROR: {
            return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false } };
        }
        case TaskConstants.UPDATE_TASK_REQUEST: {
            return { ...state, isFetching: true };
        }
        case TaskConstants.UPDATE_TASK_SUCCESS: {
            return { ...state, ...{ tasks: action.data, isSuccess: true, isFetching: false } };
        }
        case TaskConstants.UPDATE_TASK_ERROR: {
            return { ...state, ...{ error: action.error, isSuccess: false } };
        }
        default:
            return state
    }
}