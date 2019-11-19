import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container
} from 'react-bootstrap';

import { Logo, BaseComponent } from '../../shared';
import { getHomeRoute } from '../../../helpers/AuthHelper';

class SignedOffHeader extends BaseComponent {
    render() {
        return (
            <Container className='btw-off-header' >
                <div className='btw-header-logo'>
                    <Link to={getHomeRoute()}><Logo /></Link>
                </div>
            </Container>
        )
    }
};

export default SignedOffHeader;