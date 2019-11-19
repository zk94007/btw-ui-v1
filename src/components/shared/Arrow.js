import React from 'react';

import BaseComponent from './BaseComponent';
import Icon from './Icon';

export default class Arrow extends BaseComponent {
    render() {
        const {
            name = 'light',
            width = '18px',
            height = '12px',
            expanded = false
        } = this.props;
        const iconName = `arrow-${expanded ? 'up' : 'down'}-${name}`;
        return (
            <Icon width={width}
                  height={height}
                  name={iconName} />
        )
    }
}