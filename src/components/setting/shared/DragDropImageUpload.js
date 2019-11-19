import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import { BaseComponent, Typography, SvgIcon } from '../../shared'

class DragDropImageUpload extends BaseComponent {

    renderDesktopUpload = () => {
        return (
            <Typography variant='body' className='desktop-upload'>
                Drag an image here or <span>browse</span> for an image to upload
            </Typography>
        )
    }

    renderTabletUpload = () => {
        return (
            <div className='tablet-upload'>
                <SvgIcon name='add-photo-to-upload' />
                <Typography variant='body' fontWeight='600'>Upload Photo</Typography>
            </div>
        )
    }

    render() {
        return (
            <div className='btw-dnd-upload'>
                <Dropzone
                    className='drop-zone'
                    ref={(node) => { this.dropzoneRef = node; }}
                    onDrop={acceptedFiles => this.props.onChange(acceptedFiles)}>
                    {this.renderDesktopUpload()}
                    {this.renderTabletUpload()}
                </Dropzone>
            </div>
        )
    }
}

DragDropImageUpload.propTypes = {
    onChange: PropTypes.func.isRequired
}

DragDropImageUpload.defaultProps = {
    onChange: () => { }
}

export default DragDropImageUpload