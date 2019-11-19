import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BaseComponent, Button, Checkbox, Typography } from '../../shared';
import { PromoFooter, CaptainInput, CaptainCheckbox } from '../index';
import { CaptainDescription } from './index';
import routes from '../../../constants/Routes';
import CaptainImage from '../../../resources/background/become-captain-background.svg';
import appDataTypes from '../../../constants/AppDataTypes';
import { createGuestUser } from '../../../actions';
import {
    emailValidation,
    phoneValidation,
} from '../../../utility/FormValidation';

class BecomeCaptain extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            isRegistered: false,
            strongNetwork: false,
            city: '',
            phone: '',
            email: '',
            experience: '',
            agreeTermAndPolicy: false,
            isValid: {
                firstname: false,
                lastname: false,
                isRegistered: false,
                city: false,
                email: false,
                experience: false,
                agreeTermAndPolicy: false
            }
        }
    }

    onChangeHandler = (value, name, valid) => {
        const { isValid } = this.state;
        isValid[name] = valid;
        this.setState({ [name]: value, isValid } );
    };

    submitHandler = () => {
        const { createGuestUser } = this.props.actions;
        const {
            firstname,
            lastname,
            isRegistered,
            strongNetwork,
            experience,
            city,
            phone,
            email
        } = this.state;

        createGuestUser({
            firstname, lastname, isRegistered, email,
            isNetworkStrong: strongNetwork,
            cityOfResidence: city,
            pastRelevantExperience: experience,
            phoneNumber: phone
        })
    };

    isDisabled = () => {
        const { isValid } = this.state;
        return Object.values(isValid).some(value => !value);
    };

    renderTermsAndPolicy = () => {
        const { agreeTermAndPolicy } = this.state;

        return (
            <div className='term-policy-content'>
                <Checkbox
                    checked={agreeTermAndPolicy}
                    onChange={(value) => this.onChangeHandler(value, 'agreeTermAndPolicy', value)} />
                <Typography className='term-policy-label'>
                    I give consent to the processing of my personal data given in the contact
                    form above under the terms and conditions of Turnout Nation
                </Typography>
            </div>
        )
    };

    componentWillReceiveProps(props) {
        if (props.isSuccess) {
            this.onLink(routes.thankYou);
        }
    }

    render() {
        const {
            firstname,
            lastname,
            isRegistered,
            strongNetwork,
            city,
            phone,
            email,
            experience
        } = this.state;

        return (
            <Container className='btw-become-captain'>
                <div className='captain-main-content'>
                    <div className='captain-info-content'>
                        <CaptainDescription />
                        <div className='name-content'>
                            <CaptainInput
                                name='firstname'
                                value={firstname}
                                label='First Name'
                                required
                                onChange={this.onChangeHandler} />
                            <CaptainInput
                                name='lastname'
                                value={lastname}
                                label='last Name'
                                required
                                onChange={this.onChangeHandler} />
                        </div>
                        <CaptainCheckbox
                            name='isRegistered'
                            value={isRegistered}
                            required
                            label='I am registered to vote.'
                            onChange={this.onChangeHandler} />
                        <CaptainCheckbox
                            name='strongNetwork'
                            value={strongNetwork}
                            label='I have a strong network.'
                            onChange={this.onChangeHandler} />
                        <CaptainInput
                            name='city'
                            value={city}
                            label='Most of the year I live in '
                            subLabel='(City)'
                            required
                            onChange={this.onChangeHandler} />
                        <CaptainInput
                            name='phone'
                            value={phone}
                            label='Phone'
                            placeholder='+1'
                            validate={phoneValidation}
                            onChange={this.onChangeHandler} />
                        <CaptainInput
                            name='email'
                            value={email}
                            required
                            validate={emailValidation}
                            label='Email'
                            onChange={this.onChangeHandler} />
                        <CaptainInput
                            name='experience'
                            value={experience}
                            required
                            label='Past relevant experience'
                            subLabel='(education, volunteering, social initiatives)'
                            onChange={this.onChangeHandler} />
                        {this.renderTermsAndPolicy()}
                        <div className='button-content'>
                            <Button
                                size='medium'
                                disabled={this.isDisabled()}
                                className='become-captain-button'
                                onClick={this.submitHandler}>
                                Submit
                            </Button>
                        </div>
                    </div>
                    <img src={CaptainImage} alt='' className='main-image' />
                </div>
                <PromoFooter />
            </Container >
        );
    }
}


const mapStateToProps = (state) => {
    const { error, isSuccess, isFetching } = state.app[appDataTypes.createGuest] || {};
    return {
        error,
        isSuccess,
        isFetching
    };
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ createGuestUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BecomeCaptain);
