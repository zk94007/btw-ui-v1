import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import BaseComponent from './BaseComponent';
import colors from '../../constants/Colors';

class Typography extends BaseComponent {

    resolveStyleObj = (color, lightColor, fontWeight) => {
        return {
            color: lightColor ? colors.secondary : color,
            fontWeight
        }
    };

    render() {
        const {
            // native props
            className,
            style,
            children,

            // custom props
            variant = 'heading',
            fontWeight,
            color = '',
            lightColor = false,
            displayInline = false,
            ...restProps
        } = this.props;

        const styles = {...style, ...this.resolveStyleObj(color, lightColor, fontWeight)};

        return React.createElement(displayInline ? 'span' : 'div', {
            ...{
                className: cn('btw-typography', variant, className ),
                style: styles,
                children
            }, ...restProps
        });
    }
}

Typography.propTypes = {
  variant: PropTypes.oneOf(['heading', 'body', 'functional']),
  color: PropTypes.string,
  lightColor: PropTypes.bool,
  displayInline: PropTypes.bool,  
  fontWeight: PropTypes.string
};

export default Typography;