import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SvgIcon from '../../../shared/SvgIcon';
import colors from '../../../../constants/Colors';
import './styles.scss';

const SocialButton = ({ networkType, onClick, children  }) => {

    const resolveStyles = () => {
        switch (networkType) {
            case 'google':
                return {
                    iconName: 'google-normal',
                    bgColor: colors.white
                };
            case 'facebook':
                return {
                    iconName: 'facebook-normal',
                    bgColor: colors.darkBlue
                };
            case 'twitter':
                return {
                    iconName: 'twitter-normal',
                    bgColor: colors.blue
                };
            default:
                return {};
        }
    };

    const { iconName, bgColor } = resolveStyles();

    return (
        <Row onClick={onClick} className='btw-social-button no-margin' style={{ backgroundColor: bgColor }}>
            <Col xs={4} md={4} lg={4}>
                <SvgIcon name={iconName} className='icon' />
            </Col>
            <Col xs={8} md={8} lg={8}>
                { children }
            </Col>
        </Row>
    );
};

SocialButton.propTypes = {
    networkType: PropTypes.oneOf(['google', 'facebook', 'twitter']),
    onClick: PropTypes.func.isRequired
};

export default SocialButton;
