import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import routes from '../../../constants/Routes';
import appDataTypes from '../../../constants/AppDataTypes';
import colors from '../../../constants/Colors';
import { BaseComponent, Paper, Typography, Spinner, Button } from '../../shared';
import { BottomLink, SocialButton, LeftIcon, ErrorMessage } from '../components';
import { authorizeWithSocial, signInWithToken, signInWithMail } from '../../../actions/AuthActions';
import { getQueryObj } from '../helpers/queryHelper';
import socialTypes from '../helpers/socialTypes';
import {
    EmailInput,
    PasswordInput,
} from '../../shared/validatedInputs';
import './styles.scss';


class SignIn extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        const { location: { hash }, actions } = this.props;
        const userInfo = getQueryObj(hash);

        if (userInfo.token) {
            actions.signInWithToken(userInfo);
        }

        this.state = {
            email: '',
            password: '',
            startValidation: false,
            valid: {},
            error: '',
            isAuthed: userInfo.token ? true : false
        };

    }

    componentWillReceiveProps(newProps) {
        if (newProps.error && newProps.error !== this.props.error)
            this.setState({
                error: newProps.error,
                password: '',
                isValid: {},
                startValidation: false,
            }, () => {
                this.pageToTop()
                setTimeout(() => this.setState({ error: '' }), 4000)
            })
    }

    handleSocialClick = connection => () => {
        this.props.actions.authorizeWithSocial(connection, true);
    };

    handleChange = (value, isValid, name) => {
        this.setState({
            [name]: value,
            valid: { ...this.state.valid, [name]: isValid }
        });
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter' || e.which === 13) {
            this.signInWithMail();
        }
    };

    signInWithMail = () => {
        this.setState({ startValidation: true });
        const { email, password, valid } = this.state;
        if (valid.email && valid.password) {
            this.props.actions.signInWithMail(email, password);
        }
    };

    renderText = (network, color) => {
        return (
            <Typography variant='body' color={color} displayInline>Log in with {network}</Typography>
        )
    };

    render() {
        const { isFetching } = this.props;
        const { error, startValidation, isAuthed, password } = this.state;
        if (isAuthed)
            return null

        return (
            <Container className='btw-sign-in'>
                <Spinner loading={isFetching} />
                <Paper className='paper'>
                    <ErrorMessage error={error} />
                    <Row className='no-margin'>
                        <Typography className='title'>Log In</Typography>
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
                    <Typography className='text-center email-text' variant='functional' color={colors.secondary}>Or log in with email:</Typography>
                    <Row>
                        <Col md={12} className='input'>
                            <EmailInput onChange={this.handleChange}
                                isVoter={false}
                                hideLabel
                                placeholder='email@example.com'
                                leftIcon={<LeftIcon name='envelope' />}
                                startValidation={startValidation}
                                uniqueValidationEnabled={false}
                                required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='input'>
                            <PasswordInput onChange={this.handleChange}
                                label='Password'
                                defaultValue={password}
                                hideLabel
                                leftIcon={<LeftIcon name='lock' />}
                                placeholder='Password'
                                startValidation={startValidation}
                                required />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button
                                fullWidth
                                disabled={isFetching}
                                onClick={this.signInWithMail}>
                                Log In
                            </Button>
                        </Col>
                    </Row>
                    <BottomLink title=''
                        link={routes.forgotPassword}
                        linkText='Forgot Password' />
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const { error, isSuccess, isFetching } = state.app[appDataTypes.signOn];
    return {
        error,
        isSuccess,
        isFetching
    };
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ authorizeWithSocial, signInWithToken, signInWithMail }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
