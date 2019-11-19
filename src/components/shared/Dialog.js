import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import cn from 'classnames';

import { BaseComponent, Typography } from './';

class Dialog extends BaseComponent {
    render() {
        const {
            show,
            onClose,
            onHide = onClose,
            title = '',
            children,
            actionButtons = null,
            closeButton,
            className,
            ...restProps
        } = this.props;
        return (
            <Modal show={show}
                onHide={onHide}
                className={cn('btw-modal', className)}
                {...restProps}>
                <Modal.Header closeButton={closeButton}>
                    <Typography>{title}</Typography>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    {actionButtons}
                </Modal.Footer>
            </Modal>
        );
    }
}

Dialog.propTypes = {
    show: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func
};

export default Dialog; 
