import React from 'react'
import PropTypes from 'prop-types'

import { Typography, SwitchButton } from '../shared';

const NotificationSetting = ({ isEmailNotification, onChange }) => {

    return (
        <div className='btw-notification-setting'>
            <Typography lightColor variant='body'>
                We want you to stay updated at all times, so we kindly recommend
                you to turn notifications on. We won’t spam you – only inform on
                the most important updates and your profile activity.
            </Typography>
            <div className='d-flex align-items-center mt-4'>
                <SwitchButton onSwitch={onChange} checked={isEmailNotification} />
                <Typography variant='body' className='ml-2'>
                    Enable email notifications
                </Typography>
            </div>
        </div>
    )
}

NotificationSetting.propTypes = {
    isEmailNotification: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}

NotificationSetting.defaultProps = {
    isEmailNotification: false,
    onChange: () => { }
}

export default NotificationSetting