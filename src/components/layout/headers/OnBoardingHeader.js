import React from 'react';
import {
    Container
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { btwLogout } from '../../../actions/AuthActions';
import { Logo, BaseComponent, ConfirmationDialog } from '../../shared';
import HeaderProfileDropdown from '../components/HeaderProfileDropdown';

class OnBoardingHeader extends BaseComponent {
    state = {
        showAlertModal: false
    };

    handleAlertSubmit = () => {
        this.props.actions.btwLogout();
    };

    hideAlertModal = () => {
        this.setState({ showAlertModal: false });
    };

    handleActionClick = e => {
        e.stopPropagation();
        this.setState({ showAlertModal: true })
    };

    handleLogoClick = () => {
        this.handleActionClick(this.redirectToHome);
    };

    render() {
        const { showAlertModal } = this.state;

        return (
            <>
                <Container className='btw-off-header' onClickCapture={this.handleActionClick}>
                    <div className='d-flex justify-content-between'>
                        <div className='btw-header-logo'>
                            <Logo onClick={this.handleLogoClick} />
                        </div>
                        <HeaderProfileDropdown />
                    </div>
                </Container>
                <ConfirmationDialog show={showAlertModal}
                    title='Warning!'
                    submitText='Cancel'
                    cancelText='OK'
                    onSubmit={this.handleAlertSubmit}
                    description={`If you stop the onboarding process you'll be required to pick up where you left when next you log in.<br />
                                After clicking 'Ok' you will be automatically signed out.`}
                    onClose={this.hideAlertModal} />
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ btwLogout }, dispatch)
    };
};


export default connect(() => ({}), mapDispatchToProps)(OnBoardingHeader);