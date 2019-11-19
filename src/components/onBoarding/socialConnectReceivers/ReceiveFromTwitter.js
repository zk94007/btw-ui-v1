import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'

import routes from '../../../constants/Routes'
import { importVotersFromTwitter } from '../../../actions';
import { BaseComponent } from '../../shared'
import { LocalStorageManager as lsManager, storageKeys } from '../../../storage';

class ReceiveFromTwitter extends BaseComponent {
	componentWillMount() {
    	const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);
    	const { actions, history } = this.props;

    	actions.importVotersFromTwitter(oauth_token, oauth_verifier);

		const from = lsManager.getItem(storageKeys.socialConnectFrom);
    	history.push(from || routes.socialConnect)
	}

	render() {
		return <div>Verifying token....</div>
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ importVotersFromTwitter }, dispatch )
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReceiveFromTwitter))
