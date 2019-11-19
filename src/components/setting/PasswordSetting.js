import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap'
import _ from 'lodash';

import { changePassword } from '../../actions';
import { BaseComponent, Typography, PasswordInput, Button, TextInput, Spinner } from '../shared';

class PasswordSetting extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            btwIdentity: {},
            isValid: {
                currentPassword: false,
                newPassword: false,
                confirmPassword: false
            }
        }
    }

    isAllValid = () => {
        const { btwIdentity, isValid } = this.state;
        return !_.isEmpty(isValid) && !_.isEmpty(btwIdentity) && Object.values(isValid).every(val => val);
    }

    handleChange = (value, valid, name) => {
        this.setState(prevState => {
            const { btwIdentity, isValid } = prevState;
            return {
                btwIdentity: { ...btwIdentity, [name]: value },
                isValid: { ...isValid, [name]: valid }
            }
        });

        if (name === 'newPassword') {
            this.setState(prevState => {
                return {
                    isValid: { ...prevState.isValid, confirmPassword: false }
                }
            });
        }
    }

    onSubmit = () => {
        if (this.isAllValid) {
            const { currentPassword, newPassword } = this.state.btwIdentity;
            const data = {
                oldPassword: currentPassword,
                newPassword
            }
            this.setState({ btwIdentity: {} });
            this.props.actions.changePassword(data);
        }
    }

    renderPasswordInput = (name, label) => {
        return (
            <Row>
                <Col>
                    {name === 'confirmPassword' ?
                        <TextInput
                            defaultValue={this.state.btwIdentity[name]}
                            label={label}
                            type='password'
                            id={name}
                            validator={value => value === this.state.btwIdentity.newPassword}
                            validatorError='The passwords do not match'
                            onChange={this.handleChange}
                            name={name}
                            startValidation={this.isAllValid()}
                            required
                            autocomplete='new-password'
                            className='my-3' /> :
                        <PasswordInput
                            defaultValue={this.state.btwIdentity[name]}
                            className='my-3'
                            name={name}
                            label={label}
                            id={name}
                            autocomplete='new-password'
                            onChange={this.handleChange}
                            startValidation={this.isAllValid()}
                            required />
                    }
                </Col>
            </Row>
        )
    }

    render() {
        const { isFetching } = this.props;

        return (
            <div className='btw-password-setting' >
                <Spinner loading={isFetching} />
                <Typography variant='body' lightColor>
                    You can edit your password here.
                </Typography>
                {this.renderPasswordInput('currentPassword', 'Current password')}
                {this.renderPasswordInput('newPassword', 'New password')}
                {this.renderPasswordInput('confirmPassword', 'Confirm new password')}
                <Button className='my-3' size='medium' onClick={this.onSubmit} disabled={!this.isAllValid()}>
                    Save Changes
                </Button>
            </div >
        )
    }

}

const mapStateToProps = (state) => {
    const { isChangingPassword: isFetching } = state.user;
    return {
        isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ changePassword }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordSetting));