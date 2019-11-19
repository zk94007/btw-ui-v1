import React from 'react';
import classNames from 'classnames';
import { OauthSender } from 'react-oauth-flow';
import { withRouter } from 'react-router-dom';

import VoterService from '../../services/VoterService';
import { BaseComponent, Button, Typography, SocialIcon } from './index'
import config from '../../config/ApiConfig';
import { LocalStorageManager as lsManager, storageKeys } from '../../storage';

class SocialItem extends BaseComponent {
    state = {
        token: ''
    };

    async componentWillMount() {
        const token = await VoterService.getTwitterRequestTokens();
        this.setState({ token });
        lsManager.removeItem(storageKeys.socialConnectFrom);
    }

    connectedTextRender = () => {
        return (
            <Typography variant='functional' className={classNames('status', { 'status-center': this.isDesktop() })}>
                Connected
            </Typography>
        );
    };

    onButtonClick  = (e) => {
        const { text } = e.target;
        if (text === 'Connect') {
            lsManager.setItem(storageKeys.socialConnectFrom, this.props.location.pathname);
        }
    };

    connectButtonRender = () => {
        const buttonName = !this.isMobileOnly() ? 'Connect' : '+';
        const { name } = this.props;
        const { token } = this.state;
        const { socialSettings: { google, twitter }} = config;

        return name === 'google'
                    ? <OauthSender
                        authorizeUrl={google.authUrl}
                        clientId={google.clientId}
                        redirectUri={google.redirectUrl}
                        render={({url}) => (
                            <a className={this.isMobileOnly() ? 'plus-button' : 'connect-button'}
                               href={url}>{buttonName}</a>
                        )}
                        args={{scope: google.scope}}/>
                    : token
                        ? <a className={this.isMobileOnly() ? 'plus-button' : 'connect-button'}
                             href={`${twitter.authUrl}?oauth_token=${token}`}>{ buttonName }</a>
                        : <Button
                            className={this.isMobileOnly() ? 'loading-button' : 'connect-button'}>{this.isMobileOnly() ? '' : 'Loading...'}</Button>

    };

    render() {
        const { name, status } = this.props;

        return (
            <div className='btw-social-item'>
                <div className='main-container'>
                    <SocialIcon name={name} visible={status} size='large' />
                    <div className='controls' onClick={this.onButtonClick}>
                        <Typography variant='body' fontWeight='600' className='name'>
                            {name}
                        </Typography>
                        { status ? this.connectedTextRender() : this.connectButtonRender() }
                    </div>
                </div>
                <div className='border-container'>
                    <div className='item-border' />
                </div>
            </div>
        );
    }
}

export default withRouter(SocialItem);