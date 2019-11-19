/**
 * Logo Component
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { BaseComponent } from '../shared';
import logoDesktop from '../../resources/images/logo-desktop.svg';
import logoMobile from '../../resources/images/logo-mobile.svg';
import logoPromo from '../../resources/images/logo-promo.svg';

class Logo extends BaseComponent {

    getDefaultWidth = () => {
        const { isPromo } = this.props;
        return isPromo ? 137 : this.isMobileOnly() ? 60 : 137;
    };

    render() {
        const { isPromo, width = this.getDefaultWidth(), height = 60, staticContext, ...props } = this.props;
        const logo = isPromo ?
            logoPromo :
            this.isMobileOnly() ?
                logoMobile :
                logoDesktop;

        return (
            <img {...props}
                src={logo}
                alt=""
                width={width} height={height} />
        )
    }
}

Logo.propTypes = {
    isPromo: PropTypes.bool
};

Logo.defaultProps = {
    isPromo: false
};

export default withRouter(Logo);