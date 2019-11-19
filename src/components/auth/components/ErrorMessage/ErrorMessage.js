import React from 'react';

import { Typography, ErrorAlarm } from '../../../shared';
import './styles.scss';

const ErrorMessage = ({ title = 'Sorry,', error = '' }) => {

    return !!error ?
        <ErrorAlarm className='bac-error-message'>
            <Typography variant='body' fontWeight='600' className='title'>
                {title}
            </Typography>
            <Typography variant='body' lightColor>
                {error}
            </Typography>
        </ErrorAlarm>
        : null
};

export default ErrorMessage;