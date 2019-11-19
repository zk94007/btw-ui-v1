import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, Button } from '../../shared';

class NoTaskBanner extends BaseComponent {

    render() {
        return (
            <div className='bcd-no-task-banner btw-paper'>
                <SvgIcon name='banner-no-task' className='no-task-icon' />
                <Typography fontWeight='600' className='title'>
                    No Tasks Available
                </Typography>
                <Typography lightColor className='description'>
                    There are no upcoming elections in your disctict.
                </Typography>
                <Button size='medium' onClick={this.props.onNotify} className='notify-button'>
                    Notify Me On New Elections
                </Button>
            </div>
        )
    }
}

NoTaskBanner.propTypes = {
    onNotify: PropTypes.func
};

NoTaskBanner.defaultProps = {
    onNotify: () => { }
}

export default NoTaskBanner;