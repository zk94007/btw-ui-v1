import React from 'react';

import { Typography, ErrorAlarm, Button } from '../../shared';

const ConfirmEmailMessage = ({ email = 'user.email@gmail.com', isEmailSent = false, isShow = true, onConfirm = () => { } }) => {

    return isShow ?
        <ErrorAlarm className='bcd-confirm-email-message'>
            <div className='header'>
                <Typography variant='body' fontWeight='600' className='title'>
                    Confirm your email
                </Typography>
                <Button size='small' className='resend-email' color='white' onClick={onConfirm}>Resend Email</Button>
            </div>
            <Typography variant='body' lightColor onClick={onConfirm}>
                We sent you a confirmation link on <span>{email}</span>. Please check your inbox.
                <br />
                If you have confirmed your email, refresh this page to access the dashboard.
            </Typography>
            <br />
            { isEmailSent &&
                <Typography variant='body'>
                    We resent a confirmation link to your email!
                </Typography> }
        </ErrorAlarm>
        : null
};

export default ConfirmEmailMessage;