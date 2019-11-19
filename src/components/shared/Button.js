import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseComponent from '../shared/BaseComponent';

class Button extends BaseComponent {

    render() {
        const {
            size = 'large',
            color = 'blue',
            className,
            children,
            fullWidth,
            onClick,
            ...restProps
        } = this.props;

        return (
            <button className={classNames('btw-button', `button-${size}`, `button-${color}`, className, { 'button-full-width': fullWidth })}
                onClick={onClick}
                {...restProps}>
                {children}
            </button>
        )
    }
}

Button.propTypes = {
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    color: PropTypes.oneOf(['blue', 'white', 'red']),
    onClick: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool
};
Button.defaultProps = {
    onClick: () => {}
}

export default Button;