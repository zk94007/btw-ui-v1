import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
    Container
} from 'react-bootstrap';
import classNames from 'classnames';
import PubSub from 'pubsub-js';

import {
    BaseComponent,
    Logo,
    SvgIcon
} from '../../shared';
import routes from '../../../constants/Routes';
import roles from '../../../constants/Roles';
import authStorage from '../../../storage/AuthStorage';
import appDataTypes from '../../../constants/AppDataTypes';
import pubsubConstants from '../../../constants/PubSubConstants';
import HeaderProfileDropdown from '../components/HeaderProfileDropdown';

class SignedOnHeader extends BaseComponent {

    state = {
        activeItem: this.props.location.pathname
    };

    componentWillUnmount() {
       PubSub.unsubscribe(this.locationChangeSubscription);
    }

    componentDidMount() {
        this.locationChangeSubscription = PubSub.subscribe(pubsubConstants.onLocationChange, (type, value) => {
            this.setState({ activeItem: value });
        });
    }

    getCaptainLinks = () => {
        return [
            { route: routes.captainsDashboard, title: 'Home' },
            { route: routes.tasksList, title: 'Actions' },
            { route: routes.voterList, title: 'Voters' },
            // { route: routes.helpCenter, title: 'Consult' }
        ]
    };

    resolveLinks = () => {
        return authStorage.getCurrentRole() === roles.captain
            ? this.getCaptainLinks()
            : [];
    };

    getLogoLink = () => {
        return authStorage.getCurrentRole() === roles.captain
            ? routes.captainsDashboard
            : routes.adminDashboard
    }

    checkSubRoute = (route) => {
        return route.includes(routes.voterDetail)
        || route.includes(routes.profile)
        || route.includes(routes.taskDetail);
    };

    getSubRouteData = (route) => {
        if (route.includes(routes.voterDetail)) {
            return {
                title: 'All Voters',
                route: routes.voterList
            };
        }
        if (route.includes(routes.profile)) {
            return {
                title: 'Account Settings',
                route: routes.profile
            };
        }
        if (route.includes(routes.taskDetail)){
            return {
                title: 'All Actions',
                route: routes.tasksList
            }
        }
        return '';
    };

    handleHeaderClick = e => {
        if (!this.isEmailConfirmed(this.props.user)) {
            e.stopPropagation();
            e.preventDefault();
        }
    };

    render() {
        const {
            activeItem
        } = this.state;
        const {
            history: { location: { pathname, state } },
            user
        } = this.props;

        const subRouteData = this.getSubRouteData(pathname);
        const { title, route } = subRouteData || {};

        return (
            <Container className='btw-on-header'>
                <div className='d-flex align-items-center py-2'>
                    { this.isMobile() && this.checkSubRoute(pathname) ?
                        <>
                            <div className='btw-header-logo w-100 py-3 d-flex' onClickCapture={this.handleHeaderClick}>
                                    <SvgIcon name='arrow-left'
                                          height={21}
                                          onClick={() => {
                                              this.props.history.push({
                                              pathname: route,
                                              state
                                            })
                                          }}
                                          className={!subRouteData ? 'invisible' : ''} />
                                    <div className='text-decoration-none d-flex align-items-center mx-auto'>
                                        <span className='menu-item'>{ title }</span>
                                    </div>
                            </div>
                        </>
                    :
                        <>
                            <div className='btw-header-logo' onClickCapture={this.handleHeaderClick}>
                                <Link to={this.getLogoLink()}><Logo /></Link>
                            </div>
                            <div className={'btw-header-menus px-4'} onClickCapture={this.handleHeaderClick}>
                                { this.resolveLinks().map((link, i) => (
                                        <span
                                            key={i}
                                            className={classNames({ 'active-menu': link.route === activeItem }, 'mx-3 nav-item')}
                                            eventkey={i}
                                            onClick={() => {
                                                this.setState({ activeItem: link.route });
                                                this.onLink(link.route)
                                            }} >
                                            { link.title }
                                        </span>
                                    ))
                                }
                            </div>
                        </>
                    }
                    <HeaderProfileDropdown profile={user} />
                </div>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    const { sub } = authStorage.getLoggedUser();
    const { data = {}} = state.app[appDataTypes.profile];
    return {
        user: { sub, ...data }
    };
};

export default connect(mapStateToProps)(withRouter(SignedOnHeader));