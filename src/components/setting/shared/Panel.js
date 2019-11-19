/**
 * Show panel with title and components in settings page
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '../../shared'

const Panel = ({ title = '', children }) => (
    <div className='btw-paper btw-profile-panel'>
        <div className='panel-title'>
            <Typography variant='body' fontWeight='600' >
                {title}
            </Typography>
        </div>
        <div className='panel-body'>
            {children}
        </div>
    </div>
)

Panel.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string.isRequired
}

export default Panel;