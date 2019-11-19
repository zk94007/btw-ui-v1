import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';

import { BaseComponent, Typography, SvgIcon } from '../../shared';

class FAQItem extends BaseComponent {

    render() {
        const { eventKey, question, description, link, isOpen, clickQuestion } = this.props;

        return (
            <Card className='bfp-faq-item'>
                <Accordion.Toggle as={Card.Header} eventKey={eventKey} onClick={clickQuestion}>
                    <Typography className='faq-question'>
                        {question}
                    </Typography>
                    <SvgIcon name={isOpen ? 'blue-arrow-up' : 'blue-arrow-down'} />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        <Typography lightColor className='faq-description'>
                            {description}
                        </Typography>
                        <a href={link} alt='' target='_blank' rel='noopener noreferrer'>{link}</a>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }
}

FAQItem.propTypes = {
    eventKey: PropTypes.number,
    question: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    isOpen: PropTypes.bool,
    clickQuestion: PropTypes.func
};

FAQItem.defaultProps = {
    eventKey: 1,
    question: '',
    description: '',
    link: '',
    isOpen: false,
    clickQuestion: () => { }
}

export default FAQItem;