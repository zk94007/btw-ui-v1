import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import BaseComponent from './BaseComponent';

class Tabs extends BaseComponent {

    onSelectTab = tabId => () => {
        this.props.onTabSelect(tabId)
    }

    render() {
        const { tabs, activeTabId, className } = this.props

        return (
            <ul className={cn(className, 'btw-tabs')}>
                {
                    tabs.map((tab, index) => {
                        return <li key={index} className={cn('btw-tab', {'btw-tab-active': activeTabId === tab.id})} onClick={this.onSelectTab(tab.id)}>{tab.title}</li>
                    })
                }
            </ul>
        )
    }
}

Tabs.defaultProps = {
    tabs: [],
    activeTabId: '',
    onTabSelect: () => {}
};

Tabs.propTypes = {
    // tabs array [{id, title, content},...}
    tabs: PropTypes.array.isRequired,
    // id of current selected tab
    activeTabId: PropTypes.string.isRequired,
    // event when select tab item
    onTabSelect: PropTypes.func.isRequired
};

export default Tabs;