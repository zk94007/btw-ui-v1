import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { BaseComponent, Paper, Typography, Spinner, EmailInput, PasswordInput, Button, FirstNameInput, LastNameInput } from '../../shared';
import { BottomLink, LeftIcon, SocialButton, ErrorMessage } from '../components';
import { authorizeWithSocial, signUpWithToken, signUpWitMail, initializeAuthState } from '../../../actions/AuthActions';
import { getQueryObj } from '../helpers/queryHelper';
import AuthStorage from '../../../storage/AuthStorage'
import appDataTypes from '../../../constants/AppDataTypes';
import colors from '../../../constants/Colors';
import routes from '../../../constants/Routes';
import socialTypes from '../helpers/socialTypes';
import './styles.scss';
import fieldConstants from "../../../constants/FieldConstants";

class SignUp extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        const { location: { hash }, actions } = this.props;
        const userInfo = getQueryObj(hash);

        if (userInfo.token) {
            actions.signUpWithToken(userInfo);
        }

        this.state = {
            btwIdentity: {},
            isValid: {
                [fieldConstants.firstName]: false,
                [fieldConstants.lastName]: false,
                [fieldConstants.email]: false,
                [fieldConstants.password]: false
            },
            startValidation: false,
            error: false,
            isAuthed: userInfo.token ? true : false
        }
    }


    componentWillMount() {
        if (!AuthStorage.isAuthenticated()) {
            this.props.actions.initializeAuthState()
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.error && newProps.error !== this.props.error)
            this.setState(prevState => {
                return {
                    error: newProps.error,
                    btwIdentity: { ...prevState.btwIdentity, password: '' },
                    isValid: {},
                    startValidation: false
                }
            }, () => {
                this.pageToTop()
                setTimeout(() => this.setState({ error: '' }), 4000)
            })
    }

    handleSocialClick = connection => () => {
        this.props.actions.authorizeWithSocial(connection);
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter' || e.which === 13) {
            this.signUpWitMail();
        }
    };

    signUpWitMail = () => {
        const { isValid, btwIdentity } = this.state;
        this.setState({ startValidation: true });
        if (!_.isEmpty(isValid) && !_.isEmpty(btwIdentity) && Object.values(isValid).every(val => val)) {
            this.props.actions.signUpWitMail(btwIdentity)
        }
    };

    handleChange = (value, valid, name) => {
        this.setState(state => {
            const { btwIdentity, isValid } = state;
            return {
                btwIdentity: { ...btwIdentity, [name]: value },
                isValid: { ...isValid, [name]: valid }
            }
        });
    };

    renderText = (network, color) => {
        return (
            <Typography variant='body' color={color} displayInline>Sign Up with {network}</Typography>
        )
    };

    render() {
        const { isFetching } = this.props;
        const { startValidation, error, btwIdentity, isAuthed } = this.state;
        if (isAuthed)
            return null

        return (
            <Container className='btw-sign-up'>
                <Spinner loading={isFetching} />
                <Paper className='paper'>
                    <ErrorMessage error={error} />
                    <Row className='no-margin'>
                        <Typography className='title'>Sign Up</Typography>
                    </Row>
                    <div className='buttons'>
                        <SocialButton networkType='google' onClick={this.handleSocialClick(socialTypes.google)}>
                            {this.renderText('Google', colors.main)}
                        </SocialButton>
                        <SocialButton networkType='facebook' onClick={this.handleSocialClick(socialTypes.facebook)}>
                            {this.renderText('Facebook', colors.white)}
                        </SocialButton>
                        <SocialButton networkType='twitter' onClick={this.handleSocialClick(socialTypes.twitter)}>
                            {this.renderText('Twitter', colors.white)}
                        </SocialButton>
                    </div>
                    <Typography className='text-center email-text' variant='functional' color={colors.secondary}>Or sign up with email:</Typography>
                    <Row>
                        <Col md={12} className='input'>
                            <FirstNameInput
                                onChange={this.handleChange}
                                maxLength='30'
                                hideLabel
                                leftIcon={<LeftIcon name='profile' />}
                                startValidation={startValidation}
                                defaultValue={btwIdentity[fieldConstants.firstName]}
                                required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='input'>
                            <LastNameInput
                                onChange={this.handleChange}
                                maxLength='30'
                                hideLabel
                                leftIcon={<LeftIcon name='profile' />}
                                startValidation={startValidation}
                                defaultValue={btwIdentity[fieldConstants.lastName]}
                                required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='input'>
                            <EmailInput onChange={this.handleChange}
                                isVoter={false}
                                hideLabel
                                placeholder='email@example.com'
                                leftIcon={<LeftIcon name='envelope' />}
                                startValidation={startValidation}
                                uniqueValidationEnabled={false}
                                defaultValue={btwIdentity[fieldConstants.email]}
                                required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='input'>
                            <PasswordInput onChange={this.handleChange}
                                label='Password'
                                hideLabel
                                leftIcon={<LeftIcon name='lock' />}
                                placeholder='Password'
                                startValidation={startValidation}
                                defaultValue={btwIdentity[fieldConstants.password]}
                                required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Typography variant='functional' color={colors.secondary}>
                                By Clicking on the Sign Up button, <br />
                                I agree to the <Link to={routes.termsAndConditions} target='_blank'>Terms and Conditions </Link>
                                and <Link to={routes.privacyPolicy} target='_blank'>Privacy Policy</Link>
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button
                                fullWidth
                                disabled={isFetching}
                                onClick={this.signUpWitMail}>
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                    <BottomLink />
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { error, isSuccess, isFetching } = state.app[appDataTypes.register];
    return {
        error,
        isSuccess,
        isFetching
    };
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ authorizeWithSocial, signUpWithToken, signUpWitMail, initializeAuthState }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));

