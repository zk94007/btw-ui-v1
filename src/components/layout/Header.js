import React from 'react';
import PubSub from 'pubsub-js';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import pubsubConstants from '../../constants/PubSubConstants';
import { SignedOnHeader, SignedOffHeader, OnBoardingHeader, PromoHeader } from './'
import authStorage from '../../storage/AuthStorage';
import BaseComponent from '../shared/BaseComponent';
import { getUserProfile } from '../../actions';

class Header extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		const isLoggedIn = authStorage.isAuthenticated();

		this.state = {
			authenticated: isLoggedIn
		};

		if (isLoggedIn) {
			this.props.actions.getUserProfile();
		}
	}

	componentWillUnmount() {
		PubSub.unsubscribe(this.locationChangeSubscription);
		PubSub.unsubscribe(this.authSubscription);
	}

	componentWillMount() {
		this.authSubscription = PubSub.subscribe(pubsubConstants.onAuthChange, (type, value) => {
			this.setState({ authenticated: value });
		});
		this.locationChangeSubscription = PubSub.subscribe(pubsubConstants.onLocationChange, (type, value) => {
			this.forceUpdate();
		});
	}

	render() {
		const { authenticated } = this.state;

		return (
			<div className={classNames('btw-header', { 'btw-light-header': this.isPromo() })}>
				{ this.isPromo()
					? <PromoHeader />
					: authenticated
						? this.isOnBoarding()
							? <OnBoardingHeader />
							: <SignedOnHeader />
						: <SignedOffHeader />}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ getUserProfile }, dispatch)
	};
};

export default connect(null, mapDispatchToProps)(withRouter(Header));