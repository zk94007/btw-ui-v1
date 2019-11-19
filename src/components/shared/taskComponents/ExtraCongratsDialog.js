import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Dialog, SvgIcon, Typography } from '../index';
import colors from '../../../constants/Colors';

class ExtraCongratsDialog extends BaseComponent {

    onClose = () => {
        this.props.onClose()
    }

    render() {
        const { show } = this.props

        return (
            <Dialog className='btw-extra-congrate-dialog'
                show={show}
                onClose={this.onClose}>

                <Typography color={colors['white']} className='cong-title'>You earned 20 extra points! </Typography>
                <Typography color={colors['white']} variant='body'>
                    Even Freddie Mercury sang about you, cause you’re a total champ.
                </Typography>

                <div className='points-icon'>
                    <SvgIcon name="extra-points-icon" />

                    <div className='points'>
                        <SvgIcon name="medal" />
                        <Typography variant="body"> +20</Typography>
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


ExtraCongratsDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

ExtraCongratsDialog.defaultProps = {
    onClose: () => { }
};

export default ExtraCongratsDialog;