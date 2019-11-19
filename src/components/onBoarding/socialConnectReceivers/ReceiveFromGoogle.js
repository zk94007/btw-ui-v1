import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OauthReceiver } from 'react-oauth-flow';
import { withRouter } from 'react-router-dom';

import routes from '../../../constants/Routes'
import { importVotersFromGoogle } from '../../../actions';
import config from '../../../config/ApiConfig';
import { storageKeys, LocalStorageManager as lsManager } from '../../../storage';

class ReceiveFromGoogle extends Component {
    handleSuccess = async (accessToken, { response, state }) => {
        const { actions, history } = this.props;

        actions.importVotersFromGoogle(accessToken);
        history.push(this.getRedirectRoute());
    };

    handleError = error => {
        const {  history } = this.props;
        console.error('An error occured');
        console.error(error.message);
        history.push(this.getRedirectRoute());
    };

    getRedirectRoute = () => {
        const from = lsManager.getItem(storageKeys.socialConnectFrom);
        return from || routes.socialConnect;
    };

    render() {
        const { socialSettings: { google }} = config;

        return (
            <OauthReceiver
                authorizeUrl={google.authUrl}
                clientId={google.clientId}
                redirectUri={google.redirectUrl}
                tokenUrl={google.tokenUrl}
                clientSecret={google.clientSecret}
                onAuthSuccess={this.handleSuccess}
                onAuthError={this.handleError}
                render={({ processing, state, error }) => (
                    <div>
                        {processing && <p>Authorizing now...</p>}
                        {error && (
                            <p className="error">An error occured: {error.message}</p>
                        )}
                    </div>
                )}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ importVotersFromGoogle }, dispatch )
});

export default connect(null, mapDispatchToProps)(withRouter(ReceiveFromGoogle));