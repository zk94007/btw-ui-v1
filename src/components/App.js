import React from 'react';
import { withRouter } from 'react-router-dom';
import PubSub from 'pubsub-js';
import classNames from 'classnames';

import { Header } from './layout';
import Router from './Router';
import '../styles/App.scss';
import pubsubConstants from '../constants/PubSubConstants';
import BaseComponent from './shared/BaseComponent';

class App extends BaseComponent {

	componentWillReceiveProps(props) {
		PubSub.publish(pubsubConstants.onLocationChange, props.location.pathname);
	}

	render() {
		return (
			<div className='btw-app'>
				<Header />
				<div className={classNames('btw-content', { 'btw-light-content': this.isPromo() })} >
					<Router />
				</div>
			</div>
		);
	}
}

export default withRouter(App);
