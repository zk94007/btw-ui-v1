import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import History from './utility/History';
import HttpsRedirect from 'react-https-redirect';

import store from './store/index'
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

const app = (
	<Provider store={store.configure()}>
		<HttpsRedirect>
			<Router history={History}>
				<App />
			</Router>
		</HttpsRedirect>
	</Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
