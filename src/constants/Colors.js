const colors = {
    primary: '#052DFF',
    primaryHover: '#0C2EC9',
    primaryOpacity: '#C2CEFB',
    secondary: '#515973',
    main: '#0A1333',
    divider: '#E9EBF3',
    error: '#ED5052',
    background: '#FAFBFF',
    success: '#20DDAD',
    alert: '#FEC754',
    white: '#FFFFFF',
    blue: '#4BA3EB',
    darkBlue: '#475993'
};

export const getColorByStatus = status => {
    switch (status) {
        case 'INACTIVE' || 'DENIED' || 'REMOVED':
            return colors.error;
        case 'TEMPORARY':
            return colors.alert;
        case 'ACTIVE':
            return colors.success;
        default:
            return colors.error;
    }
};

export default colors