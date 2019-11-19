import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { Typography } from '../../../shared';
import './styles.scss';

const BottomLink = ({ title = 'Already have an account?', link = '/', linkText = 'Log in' }) => {
    return (
        <Row className='btw-bottom-link no-margin'>
            <Typography className='btw-bottom-text' variant='body' displayInline lightColor>
                { title }
            </Typography>
            <Link to={link}> { linkText } </Link>
        </Row>
    )
};

export default BottomLink;