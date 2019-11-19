import React  from 'react';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';

import BaseComponent from '../shared/BaseComponent';
import Paper from '../shared/Paper';
import SvgIcon from '../shared/SvgIcon';
import Typography from '../shared/Typography';
import colors from '../../constants/Colors';
import './_verifyEmail.scss';

class VerifyEmail extends BaseComponent {
    constructor(props, context) {
		super(props, context);
        
        this.state = {}
    }

    render() {
        return(
            <Paper className={cn('verify-email')}>
                <SvgIcon name="verify-email" />
                <Typography className={cn('confirm-text')}>Confirm your email, please check your inbox.</Typography>
                <Typography color={colors['primary']} displayInline variant='body' className={cn('email-address')}>user.email@gmail.com</Typography>
                <div className={cn('receive-email')}>
                    <Typography lightColor displayInline variant='functional'>Didnt receive an email?</Typography>
                    <Typography displayInline variant='body' className={cn('resend-btn')}>Resend</Typography>

                </div>
            </Paper>
        );
    }
}

export default withRouter(VerifyEmail);