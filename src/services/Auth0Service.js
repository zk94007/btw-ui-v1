import auth0 from 'auth0-js';

import config from '../config/ApiConfig';

const authConfig = config.auth0;

class Auth0Service {
    constructor(redirectUrl) {
        this.auth0 = new auth0.WebAuth({
            domain: authConfig.domain,
            redirectUri: redirectUrl,
            clientID: authConfig.clientId,
            responseType: 'token id_token',
            audience: authConfig.audience,
        });
    }

    parseError = (response, error) => {
        const { description, original: { response: { body: { message } = {}} = {}} = {} } = response;
        return typeof description === 'string' ? description
            : message || error;
    };

    signUp = ({ firstname, lastname, email, password }) => {
        return new Promise((resolve, reject) => {
            this.auth0.signup({
                connection: authConfig.connection,
                email,
                password,
                user_metadata: {
                    firstname,
                    lastname,
                    social: 'false'
                }
            }, response => {
                if (response === null) {
                    resolve(response);
                } else {
                    reject(this.parseError(response, 'Error occurred while signing up.'));
                }
            });
        });
    };

    socialAuthorize = (connection) => {
        return new Promise((resolve, reject) => {
            this.auth0.authorize({
                connection
            }, response => {
                if (response === null) {
                    resolve(response);
                } else {
                    reject(this.parseError(response, 'Error occurred while signing up.'));
                }
            });
        });

    };

    signIn = ({ email, password }) => {
        return new Promise((resolve, reject) => {
            this.auth0.login({
                username: email,
                password: password
            }, response => {
                if (response === null) {
                    resolve();
                } else {
                    reject(this.parseError(response, 'Error occurred while signing in.'));
                }
            });
        });
    };

    signOut = () => {
        this.auth0.logout({ returnTo: this.auth0.baseOptions.redirectUri });
    };

}

export default Auth0Service;

