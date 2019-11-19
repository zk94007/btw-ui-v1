import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { forgotPasswordRequest } from '../../../actions/ChangePasswordActions';
import routes from '../../../constants/Routes';
import { BaseComponent, Button, Spinner, Typography, EmailInput } from '../../shared';
import { BottomLink } from '../components';
import './styles/index.scss';

class ForgotPassword extends BaseComponent {
    constructor() {
        super();
        this.state = {
            email: '',
            isValid: false,
            isUserFound: -1
        }
    }

    componentWillReceiveProps(props) {
        const { isUserFound } = props;
        this.setState({ isUserFound: isUserFound ? 1 : 0 });
    }

    handleChange = (value, valid, name) => {
        this.setState({ email: value, isValid: valid });
    };

    onForgotPassword = () => {
        const { isValid, email } = this.state;
        const { forgotPasswordRequest } = this.props;
        const data = {
            email: email
        };

        if (isValid) {
            forgotPasswordRequest(data);
        }
    }

    renderMessage = () => {
        const { isUserFound } = this.state;
        return (
            <React.Fragment>
                {isUserFound === 0 && <Typography variant='functional' className='errorMessage' displayInline>User doesn't exist</Typography>}
                {isUserFound === 1 && <Typography variant='functional' className='successMessage' displayInline>Reset password request sent</Typography>}
            </React.Fragment>
        )
    }

    render() {
        const { isFetching } = this.props;
        const { email } = this.state;

        return (
            <div className="btw-forgot-password">
                <Spinner loading={isFetching} />
                <div className='content btw-paper'>
                    <Typography className='title'>Reset Password</Typography>
                    <Typography variant='body' className='description'>
                        Enter the email address associated with your account and
                        we’ll send you a link to create a new Password
					</Typography>
                    {this.renderMessage()}
                    <Row className='inputs-row'>
                        <Col md={12}>
                            <EmailInput
                                startValidation
                                defaultValue={email}
                                onChange={this.handleChange}
                                uniqueValidationEnabled={false}
                                required />
                        </Col>
                    </Row>
                    <Button fullWidth onClick={this.onForgotPassword.bind(this, 'onForgotPassword')}>
                        Send Verification Link
                    </Button>
                    <BottomLink title='Remembered?'
                        link={routes.signIn}
                        linkText='Log in' />
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { isUserFound, isFetching } = state.request;
    return {
        isUserFound,
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => ({
    forgotPasswordRequest: (email) => dispatch(forgotPasswordRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));