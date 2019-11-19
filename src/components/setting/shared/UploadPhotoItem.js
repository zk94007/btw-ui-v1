import React from 'react';

import { BaseComponent, SvgIcon, Typography } from '../../shared'

class UploadPhotoItem extends BaseComponent {

    render() {
        const { onRemove, file } = this.props;

        return (
            <div className='bsp-photo-item'>
                <div className='file-info'>
                    <SvgIcon name='uploaded-photo' />
                    <Typography variant='body' lightColor className='file-name'>{file.name}</Typography>
                </div>
                <SvgIcon
                    name='upload-photo-remove'
                    className='remove-button'
                    onClick={onRemove} />
            </div>
        );
    }
}

export default UploadPhotoItem;