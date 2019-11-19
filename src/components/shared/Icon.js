import React from 'react';

import BaseComponent from './BaseComponent';

export default class Icon extends BaseComponent {
    render() {
        const { name, width, height, ext = 'png', ...restProps } = this.props;
        return (
            <img src={require(`../../resources/icons/${name}.${ext}`)}
                 width={width}
                 height={height}
                 alt={name}
                 {...restProps} />
        )
    }
}