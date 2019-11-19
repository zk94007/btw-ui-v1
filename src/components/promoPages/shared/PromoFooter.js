import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';

import { BaseComponent, Typography, SvgIcon } from '../../shared';
import { CaptainInput } from '../index';
import LogoPromo from '../../../resources/images/logo-promo.svg';
import LogoPromoPortable from '../../../resources/images/logo-promo-portable.svg';
import routes from '../../../constants/Routes';
import appDataTypes from '../../../constants/AppDataTypes';
import { subscribeGuestUser, resetSubscribe } from '../../../actions';
import { emailValidation } from '../../../utility/FormValidation';
import colors from '../../../constants/Colors';

class PromoFooter extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isValid: true
        }
    }

    emailChangeHandler = (value, name, isValid) => {
        this.setState({ email: value, isValid });
    };

    onSubscribeClick = () => {
        const { email, isValid } = this.state;
        const { subscribeGuestUser } = this.props.actions;

        if (isValid && email) {
            subscribeGuestUser(email);
        }
    };

    renderInfoList = () => {
        return (
            <div className='info-list-content'>
                <ul className='info-list'>
                    <li>
                        <Link to={routes.faq} target='_blank'>FAQ</Link>
                    </li>
                    <li>
                        <Link to={routes.becomeCaptain} target='_blank'>Become Captain</Link>
                    </li>
                    <li>
                        <Link to={routes.termsAndConditions} target='_blank'>Terms & Privacy</Link>
                    </li>
                </ul>
                <ul className='info-list'>
                    <li>
                        <Typography variant='functional' className='contact-info'>
                            Contact:
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='functional' className='contact-email'>
                            hi@bethewave.vote
                        </Typography>
                    </li>
                </ul>
            </div>
        )
    };

    renderEmailContent = () => {
        const { email, isValid } = this.state;
        const { isSuccess, error } = this.props;

        return (
            <div className='email-content'>
                <Typography className='email-description'>
                    Interested in what we are doing in general?
                    subscribe to join our Slack channel for updates
                </Typography>
                <div className='email-input'>
                    <CaptainInput
                        required
                        placeholder='Email'
                        value={email}
                        name='Email'
                        validate={emailValidation}
                        onChange={this.emailChangeHandler} />
                    <SvgIcon onClick={this.onSubscribeClick}
                             name='long-arrow-right'
                             className={cn('arrow-right', { 'arrow-enabled': isValid && email, 'arrow-disabled': !isValid })} />
                </div>
                { isSuccess && <Typography className='result-message'
                                            variant='body'
                                            color={colors.success}>
                    You have been successfully subscribed
                    </Typography>}
                { error && <Typography className='result-message'
                                         variant='body'
                                         color={colors.error}>
                    { error }
                    </Typography>
                }
            </div>
        )
    };


    componentWillReceiveProps(props) {
        if (props.isSuccess) {
            setTimeout(() => {
                this.props.actions.resetSubscribe();
            }, 4000);
        }
    }

    render() {
        return (
            <div className='btw-promo-footer'>
                <div className='main-content'>
                    <img
                        src={this.isMobileOnly() || this.isTablet() ? LogoPromoPortable : LogoPromo}
                        alt=''
                        className='logo-image' />
                    <div className='info-content'>
                        {this.renderInfoList()}
                        {this.renderEmailContent()}
                    </div>
                </div>
                <Typography variant='functional' lightColor className='footer-title'>
                    ©2019 Turnout Nation
                </Typography>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { error, isSuccess, isFetching } = state.app[appDataTypes.subscribeGuest] || {};
    return {
        error,
        isSuccess,
        isFetching
    };
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ subscribeGuestUser, resetSubscribe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoFooter);