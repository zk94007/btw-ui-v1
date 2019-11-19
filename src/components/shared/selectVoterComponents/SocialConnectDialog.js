import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { BaseComponent, Dialog, Typography, SocialItem } from '../index';
import { storageKeys, LocalStorageManager as lsManager } from '../../../storage';
import routes from '../../../constants/Routes';
import colors from '../../../constants/Colors';

class SocialConnectDialog extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            google: false,
            twitter: false
        };
    }

    onCloseHandler = () => {
        this.props.onClose();
    };

    socialConnectHandler = (name) => {
        this.setState({ [name]: true });
    };

    socialItemRender = () => {
        const { pathname } = this.props.location;
        let { google, twitter } = this.state;
        const { isImportSocialFetching, error } = this.props;

        if (pathname !== routes.addVoter) {
            google = lsManager.getItem(storageKeys.googleConnected);
            twitter = lsManager.getItem(storageKeys.twitterConnected);
        }

        return (
            <div className='content'>
                <SocialItem
                    name='google'
                    status={google} />
                <SocialItem
                    name='twitter'
                    status={twitter} />
                { isImportSocialFetching && <Typography variant='body'>Loading...</Typography>}
                { error && <Typography variant='body' color={colors.error}>{ error }</Typography> }
            </div>
        );
    };

    render() {
        const { show } = this.props;

        return (
            <Dialog className='bsc-social-connect-dialog'
                show={show}
                closeButton
                onClose={this.onCloseHandler}
                title='Connect social accounts'>
                <Typography variant='body' lightColor>
                    Connect your favourite social media services to find your friends among all the voters.
                </Typography>
                {this.socialItemRender()}
            </Dialog>
        )
    }
}

SocialConnectDialog.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func
};

SocialConnectDialog.defaultProps = {
    show: true,
    onClose: () => { }
};

const mapStateToProps = (state) => {
    const { isImportSocialFetching, importSocialError } = state.voterList;
    return {
        error: importSocialError,
        isImportSocialFetching
    };
};

export default connect(mapStateToProps)(withRouter(SocialConnectDialog));