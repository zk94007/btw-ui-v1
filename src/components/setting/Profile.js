import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap'

import { btwLogout } from '../../actions/AuthActions';
import { BaseComponent, Typography, ButtonLink } from '../shared';
import {
    ProfileInformation,
    PasswordSetting,
    NotificationSetting,
    DeleteAccountDialog,
    LeftSideMenu,
    Panel
} from './index'

const menuItems = {
    password: 'Password',
    notification: 'Notification',
    profile: 'Profile'
};

class Profile extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeMenu: menuItems.profile,
            openDeleteModal: false,
            isEmailNotification: true
        }
        this.profileRef = React.createRef();
        this.notificationRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    onEmailNotificationHandler = (isEmailNotification) => {
        this.setState({ isEmailNotification });
    }

        onGotoPanel = menu => {
            this.setState({ activeMenu: menu });

        switch (menu) {
            case menuItems.password:
                window.scrollTo(0, this.passwordRef.current.offsetTop);
                break;
            case menuItems.notification:
                window.scrollTo(0, this.notificationRef.current.offsetTop);
                break;
            case menuItems.profile:
                window.scrollTo(0, this.profileRef.current.offsetTop);
                break;
            default:
                break;
        }
    }

    onLogout = () => {
        this.props.actions.btwLogout();
    }

    onOpenDeleteAccountModal = () => {
        this.setState({ openDeleteModal: true });
    }

    onCloseModal = () => {
        this.setState({ openDeleteModal: false });
    }

    onDeleteAccount = () => {
    }

    onSaveChange = () => {
    }

    showSection = () => {
        const { activeMenu, isEmailNotification } = this.state;

        switch (activeMenu) {
            case menuItems.password:
                return <PasswordSetting />
            case menuItems.notification:
                return (
                    <NotificationSetting
                        onChange={this.onEmailNotificationHandler}
                        isEmailNotification={isEmailNotification} />
                )
            case menuItems.profile:
            default:
                return (
                    <>
                        <ProfileInformation />
                        <ButtonLink
                            className='delete-account-button'
                            label={'Delete your account'}
                            onClick={this.onOpenDeleteAccountModal} />
                    </>
                )
        }
    }

    render() {
        const { openDeleteModal, activeMenu, isEmailNotification } = this.state;

        return (
            <Container className='btw-account-settings'>
                <Typography className='account-title'> Account Settings </Typography>
                <Row>
                    <Col lg={2} className='side-wrapper'>
                        <LeftSideMenu
                            onSetActiveMenu={this.onGotoPanel}
                            onLogout={this.onLogout}
                            activeMenu={activeMenu}
                            menuItems={menuItems} />
                    </Col>
                    {this.isMobileOnly() ?
                        this.showSection() :
                        <Col lg={8}>
                            <div ref={this.profileRef}>
                                <Panel title='Profile Information'>
                                    <ProfileInformation />
                                </Panel>
                            </div>
                            <div ref={this.passwordRef}>
                                <Panel title='Password'>
                                    <PasswordSetting />
                                </Panel>
                            </div>
                            <div ref={this.notificationRef}>
                                <Panel title='Notification'>
                                    <NotificationSetting
                                        onChange={this.onEmailNotificationHandler}
                                        isEmailNotification={isEmailNotification} />
                                </Panel>
                            </div>
                            <ButtonLink className='delete-account-button' label={'Delete your account'} onClick={this.onOpenDeleteAccountModal} />
                        </Col>
                    }
                </Row>
                <DeleteAccountDialog
                    open={openDeleteModal}
                    onClose={this.onCloseModal}
                    onDelete={this.onDeleteAccount}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ btwLogout }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));