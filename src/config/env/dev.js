import routes from '../../constants/Routes';

export default {
    apiHost: 'http://localhost:3000',
    auth0: {
        domain: 'bethewave.auth0.com',
        clientId: 'Rqye0D70khKhE1LVQrsA6rRSugk24KxK',
        connection: 'Username-Password-Authentication',
        audience: 'https://bethewave.auth0.com/api/v2/',
    },
    socialSettings: {
        google: {
            authUrl: 'https://accounts.google.com/o/oauth2/auth',
            // eslint-disable-next-line
            redirectUrl: `${location.origin}${routes.connectGoogle}`,
            tokenUrl: 'https://oauth2.googleapis.com/token',
            clientId: '905671205791-jb00s4o9g6ckv2i1p5tlucu9f52u33ke.apps.googleusercontent.com',
            clientSecret: 'RhyX1KSLZXasbIosMPetrIvc',
            scope: 'https://www.googleapis.com/auth/contacts'
        },
        twitter: {
            authUrl: 'https://twitter.com/oauth/authorize'
        }
    }
}
