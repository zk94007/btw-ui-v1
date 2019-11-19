import React from 'react';
import { Container } from 'react-bootstrap';

import { Logo, BaseComponent, Button, SvgIcon } from '../../shared';
import routes from '../../../constants/Routes';

class PromoHeader extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isShowDropDown: false
        }
    }

    handleLogoClick = () => {
        this.onLink(routes.main);
    };

    handleFAQ = () => {
        this.onLink(routes.faq);
        this.setState({ isShowDropDown: false });
    }

    handleBecomeCaptain = () => {
        this.onLink(routes.becomeCaptain);
        this.setState({ isShowDropDown: false });
    }

    clickMenuIconHandler = () => {
        this.setState((prevState) => ({ isShowDropDown: !prevState.isShowDropDown }));
    }

    renderComputerMenu = () => {
        return (
            <div className='promo-header-menu'>
                <span className='faq-item' onClick={this.handleFAQ} >
                    FAQ
                </span>
                <Button
                    size='medium'
                    className='become-caption-button'
                    onClick={this.handleBecomeCaptain}>
                    Become Captain
                </Button>
                <Button
                    size='medium'
                    className='become-caption-button'
                    onClick={() => this.onLink(routes.signIn)}>
                    Log In
                </Button>
            </div>
        )
    }

    renderMobileMenu = () => {
        const { isShowDropDown } = this.state;

        return (
            <div className='promo-mobile-menu'>
                <SvgIcon name='dark-mobile-menu' onClick={this.clickMenuIconHandler} />
                {isShowDropDown && (
                    <div className='mobile-header-panel'>
                        <span className='faq-item' onClick={this.handleFAQ} >
                            FAQ
                        </span>
                        <span className='become-caption-button' onClick={this.handleBecomeCaptain} >
                            Become Captain
                        </span>
                        <span className='become-caption-button' onClick={() => this.onLink(routes.signIn)} >
                            Log in
                        </span>
                    </div>
                )}
            </div>
        )
    }

    render() {
        return (
            <>
                <Container className='btw-promo-header'>
                    <div className='btw-header-logo'>
                        <Logo isPromo onClick={this.handleLogoClick} />
                    </div>
                    {this.renderComputerMenu()}
                    {this.renderMobileMenu()}
                </Container>
            </>
        )
    }
}

export default PromoHeader;