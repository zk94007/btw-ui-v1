import { groupBy } from 'lodash';

export function getTaskScore(subTasks) {
    let total = 0;
    let score = 0;

    if (subTasks.length !== 0) {
        subTasks.forEach((subTask) => {
            total += subTask.points;
            score += subTask.status === 'completed' ? subTask.points : 0;
        })
    }

    return { total, score };
}

export function getCompletedTasksCount(subTasks) {
    return subTasks.filter(subTask => subTask.status === 'completed').length;
}

export function getGroupTaskStatus(subTasks) {
    return groupBy(subTasks, 'status');
}
