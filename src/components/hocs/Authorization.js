import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import authStorage from '../../storage/AuthStorage';
import { authorizeRoute } from '../../actions'
import Routes from '../../constants/Routes'

let inTransition = '';

const Authentication = (RouteComponent, roles) => {

    class WithAuthentication extends Component {
        constructor(props, context) {
            super(props, context);
            this.state = {};
        }

        render() {
            const { location: { pathname }, history: { push, goBack } } = this.props;
            const user = authStorage.getLoggedUser();

            // check for none existing routes
            if (!Object.values(Routes).some(route => route.includes(pathname)) && inTransition !== pathname) {
                inTransition = pathname;
                goBack();
                return null;
            }

            const route = authorizeRoute(pathname, user, roles);

            // check for redirect
            if (route !== pathname) {
                push(route);
                return null;
            }

            return <RouteComponent {...this.props} />
        }
    }

    return withRouter(WithAuthentication)
};

export default Authentication;
