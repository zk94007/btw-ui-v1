import routes from '../../constants/Routes';

export default {
    apiHost: 'https://api-prod.turnoutnation.org',
    auth0: {
        domain: 'turnoutnation.auth0.com',
        clientId: 'ZI3Gfb6k627jJKqesmHIDx9S5YOjJFwq',
        connection: 'Username-Password-Authentication',
        audience: 'https://turnoutnation.auth0.com/api/v2/',
    },
    socialSettings: {
        google: {
            authUrl: 'https://accounts.google.com/o/oauth2/auth',
            // eslint-disable-next-line
            redirectUrl: `${location.origin}${routes.connectGoogle}`,
            tokenUrl: 'https://oauth2.googleapis.com/token',
            clientId: '467878569486-cv5riohbonv19di551pf6oo067ua5qk1.apps.googleusercontent.com',
            clientSecret: 'OIFMn7kLwkVwW7tOwFrOBlXc',
            scope: 'https://www.googleapis.com/auth/contacts',
        },
        twitter: {
            authUrl: 'https://twitter.com/oauth/authorize',
        }
    }
}