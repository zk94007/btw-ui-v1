import React from 'react';
import auth0 from 'auth0-js';

import config from '../../../config/ApiConfig';
const authConfig = config.auth0;

export default class CorsCallBack extends React.Component {
    componentDidMount() {
        const auth = new auth0.WebAuth({
            clientID: authConfig.clientId,
            domain: authConfig.domain,
        });
        auth.crossOriginVerification();
    }

    render() {
        return null;
    }
}