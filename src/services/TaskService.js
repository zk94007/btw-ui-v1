import config from '../config/ApiConfig';
import { getAsync, patchAsync, uploadFileAsync } from '../helpers/RequestHelper';

export default {
    loadTaskList,
    updateTask,
    uploadFile,
    getTaskListByVoter
};

function loadTaskList(userId) {
    return getAsync({
        url: `${config.apiHost}/task/all/${userId}`
    });
}

function updateTask(taskId, data) {
    return patchAsync({
        url: `${config.apiHost}/task/${taskId}`,
        data
    })
}

function getTaskListByVoter(voterId) {
    return getAsync({
        url: `${config.apiHost}/task/all/${voterId}/voter`
    });
}

function uploadFile(file) {
    return uploadFileAsync({
        url: `${config.apiHost}/file/upload`,
        file,
        tag: 'image'
    })
}
