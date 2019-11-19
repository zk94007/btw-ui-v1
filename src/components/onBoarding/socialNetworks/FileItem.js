import React from 'react';

import { BaseComponent, SvgIcon, Typography } from '../../shared'

class FileItem extends BaseComponent {

    render() {
        const { onRemove, file } = this.props;

        return (
            <div className='bsn-file-item'>
                <div className='file-info'>
                    <SvgIcon name='voter-list-file' />
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

export default FileItem;