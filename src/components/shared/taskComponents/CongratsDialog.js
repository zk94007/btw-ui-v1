import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Dialog, SvgIcon, Typography } from '../index';
import colors from '../../../constants/Colors';

class CongratsDialog extends BaseComponent {

    onClose = () => {
        this.props.onClose()
    }

    render() {
        const { show } = this.props

        return (
            <Dialog className='btw-congrate-dialog'
                show={show}
                onClose={this.onClose}>

                <Typography color={colors['white']} className='cong-title'>Congratulations!</Typography>
                <Typography color={colors['white']} variant='body'>
                    Here are your 4 points. Well deserved, my friend.
                    Well deserved!
                </Typography>

                <div className='points-icon'>
                    <SvgIcon name="points-icon" />

                    <div className='points'>
                        <SvgIcon name="medal" />
                        <Typography variant="body"> +4</Typography>
                    </div>
                </div>

                <Typography color={colors['white']} variant='body'>Share your result:</Typography>

                <div className='share-icons'>
                    <SvgIcon name="social-twitter" className='tw-icon' />
                    <SvgIcon name="social-fb" />
                </div>

                <SvgIcon name="ellipse-solid" className='ellipse-solid' />
                <SvgIcon name="plus-solid" className='plus-solid' />
            </Dialog>
        )
    }

}


CongratsDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

CongratsDialog.defaultProps = {
    onClose: () => { }
};

export default CongratsDialog;