import React from 'react';

import { BaseComponent, Dialog, Button, Typography } from '../shared';

export default class ConfirmationDialog extends BaseComponent {
    render() {
        const {
            show,
            onClose,
            submitText = 'Ok',
            cancelText = 'Cancel',
            title = '',
            description = '',
            onSubmit,
        } = this.props;
        return (
            <Dialog
                className='btw-account-modal'
                show={show}
                onClose={onClose}
                title={title}
                actionButtons={[
                    <Button key='btn-1' size='medium' onClick={onClose} className={'primary'}>{submitText}</Button>,
                    <Button key='btn-2' size='medium' color='white' onClick={onSubmit} className={'secondary leave'}>{cancelText}</Button>
                ]}
                closeButton
            >
                <Typography variant='body' lightColor dangerouslySetInnerHTML={{ __html: description }} />
            </Dialog>
        );
    }
}
