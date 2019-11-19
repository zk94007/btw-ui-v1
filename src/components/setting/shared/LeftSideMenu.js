import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BaseComponent, Typography, ButtonLink } from '../../shared'

class LeftSideMenu extends BaseComponent {

    onMenuHanlder = menu => () => {
        this.props.onSetActiveMenu(menu)
    }

    renderSidebarItem = (name) => {
        const { activeMenu } = this.props;

        return (
            <Typography
                variant='body'
                fontWeight='600'
                lightColor
                className={classNames('sidebar-item', { 'active': activeMenu === name })}
                onClick={this.onMenuHanlder(name)}>
                {name}
            </Typography>
        )
    }

    render() {
        const { menuItems } = this.props;

        return (
            <div className='btw-setting-sidebar'>
                <div className='sidebar-menu'>
                    {this.renderSidebarItem(menuItems.profile)}
                    {this.renderSidebarItem(menuItems.password)}
                    {this.renderSidebarItem(menuItems.notification)}
                </div>
                <ButtonLink onClick={this.props.onLogout} label='Log out' className='logout-button' />
            </div>
        )
    }
}


LeftSideMenu.propTypes = {
    activeMenu: PropTypes.string,
    menuItems: PropTypes.object,
    onSetActiveMenu: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default LeftSideMenu