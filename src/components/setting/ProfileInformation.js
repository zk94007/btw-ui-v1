import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import _ from 'lodash';

import { getCurrentUser, updateProfile } from '../../actions';
import {
    FirstNameInput,
    LastNameInput,
    Button,
    BaseComponent,
    Typography
} from '../shared';
import { ProfileAvatar } from './index'
import fieldConstants from '../../constants/FieldConstants';

class ProfileInformation extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowSaveModal: false,
            profileInfo: {},
            isValid: {
                firstname: false,
                lastname: false,
            },
            bioInfo: '',
            profileImageUrl: '',
            startValidation: false
        }
    }

    componentDidMount() {
        this.props.actions.getCurrentUser();
    }

    componentWillReceiveProps(props) {
        const { user } = props;
        if (!!user) {
            const { firstname, lastname } = user;
            this.setState({
                profileInfo: {
                    firstname,
                    lastname
                },
                isValid: {
                    firstname: !!firstname,
                    lastname: !!lastname,
                },
                bioInfo: user.bioInfo
            });
        }
    }

    isAllValid = () => {
        const { profileInfo, isValid } = this.state;
        return !_.isEmpty(profileInfo) && Object.values(isValid).every(val => val);
    }

    handleChange = (value, valid, name) => {
        this.setState(prevState => {
            const { profileInfo, isValid } = prevState;

            return {
                profileInfo: { ...profileInfo, [name]: value },
                isValid: { ...isValid, [name]: valid }
            }
        });
    }

    textChangeHandler = event => {
        this.setState({ bioInfo: event.target.value });
    }

    onUploadImageHandler = profileImageUrl => {
        this.setState({ profileImageUrl });
    }

    onSubmit = () => {
        const { user, actions } = this.props;
        const { profileInfo, bioInfo, profileImageUrl } = this.state;
        let data = { ...user, ...profileInfo, bioInfo };
        if (!!profileImageUrl) {
            data = { ...data, profileImageUrl };
        }

        actions.updateProfile(data);
    }

    render() {
        const { profileInfo, bioInfo, startValidation } = this.state;
        const { user } = this.props;

        if (!user) {
            return null;
        }

        return (
            <div className='btw-profile-information'>
                <ProfileAvatar className='my-3' onUploadImage={this.onUploadImageHandler} {...this.props} />
                <Row>
                    <Col>
                        <FirstNameInput
                            className='my-3'
                            defaultValue={profileInfo.firstname}
                            onChange={this.handleChange}
                            startValidation={startValidation}
                            required />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LastNameInput
                            className='my-3'
                            defaultValue={profileInfo.lastname}
                            onChange={this.handleChange}
                            startValidation={startValidation}
                            required />
                    </Col>
                </Row>
                <div className='field-content'>
                    <Typography variant='functional' fontWeight='600' className='field-label'>
                        Email
                    </Typography>
                    <Typography variant='body'>
                        {user.email}
                    </Typography>
                </div>
                <div className='field-content'>
                    <Typography variant='functional' fontWeight='600' className='field-label'>
                        Profile Information
                    </Typography>
                    <textarea
                        placeholder='Some personal details you think other users may want to know.'
                        value={bioInfo}
                        rows='5'
                        name={fieldConstants.profileInformationText}
                        onChange={this.textChangeHandler} />
                    <Typography variant='body' lightColor>
                        This information will be displayed on your profile page.
                    </Typography>
                </div>
                <Button className='my-3 btn-submit' size='medium' disabled={!this.isAllValid()} onClick={this.onSubmit}>
                    Save Changes
                </Button>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    const {  data } = state.app.profile;

    return {
        user: data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getCurrentUser, updateProfile }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileInformation));