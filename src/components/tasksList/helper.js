export function resolveStatus (status) {
    switch (status) {
        case 'notstarted':
            return 'Not started';
        case 'inprogress':
            return 'In progress';
        case 'completed':
            return 'Completed';
        default:
            return ''

    }
}