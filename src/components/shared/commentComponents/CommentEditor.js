import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import taskService from '../../../services/TaskService';
import { BaseComponent, Button, VoterAvatar, SvgIcon } from '../index';

class CommentEditor extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: '',
            images: []
        }
    }

    componentDidMount() {
        const { comment: { text, images } } = this.props;
        this.setState({ text, images });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comment !== this.props.comment) {
            const { comment: { text, images } } = this.props;
            this.setState({ text, images });
        }
    }

    inputChangeHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    onCancelHandler = () => {
        this.setState({ text: '', images: [] });
        this.props.onCancel();
    }

    onSaveHandler = () => {
        const comment = this.state;
        if (comment.text || comment.images.length > 0) {
            this.props.onSave(comment);
        }
    }

    renderFooter = () => {
        const { isAdd } = this.props;

        return (
            <div className='content-footer'>
                <Button color='white' size='small' onClick={this.onCancelHandler}
                    className='content-button'>
                    Cancel
                </Button>
                <Button size='small' onClick={this.onSaveHandler}
                    className='content-button'>
                    {isAdd ? 'Add' : 'Edit'} Comment
                </Button>
            </div>
        )
    }

    inputImageHandler = files => {
        const file = files[0];
        taskService.uploadFile(file).then(
            response => {
                const { imageUrl } = response;
                this.setState((prevState) => ({
                    images: [...prevState.images, imageUrl]
                }));
            });
    }

    removeImageHandler = (index) => () => {
        const { images } = this.state;
        this.setState({ images: [...images.slice(0, index), ...images.slice(index + 1)] })
    }

    renderImageList = () => {
        const { images } = this.state;

        return (
            <div className='image-list'>
                {images.map((image, index) => (
                    <div key={index} className='image-item'>
                        <img src={image} className='image' alt='' />
                        <SvgIcon name='remove-icon' className='remove-button' onClick={this.removeImageHandler(index)} />
                    </div>
                ))}
                {this.renderUploadImage()}
            </div>
        )
    }

    renderUploadImage = () => {
        return (
            <Dropzone
                className='drop-zone'
                ref={(node) => { this.dropzoneRef = node; }}
                onDrop={this.inputImageHandler}>
                <SvgIcon name='add-photo-to-upload' />
            </Dropzone>
        )
    }

    renderEditor = () => {
        const { text } = this.state;

        return (
            <div className='content-editor'>
                <textarea
                    placeholder='Add updates or attach a photo...'
                    value={text}
                    rows='2'
                    onChange={this.inputChangeHandler} />
                {this.renderImageList()}
            </div>
        )
    }

    render() {
        const { voter } = this.props;

        return (
            <div className='btw-comment-editor'>
                <div className='comment-avatar'>
                    <VoterAvatar
                        src={voter.src}
                        firstname={voter.firstName}
                        lastname={voter.lastName}
                        size={24}
                        noBorder />
                </div>
                <div className='comment-content'>
                    {this.renderEditor()}
                    {this.renderFooter()}
                </div>
            </div>
        )
    }
}

CommentEditor.propTypes = {
    isAdd: PropTypes.bool,
    comment: PropTypes.object,
    voter: PropTypes.object,
    onCancel: PropTypes.func,
    onSave: PropTypes.func
};

CommentEditor.defaultProps = {
    isAdd: true,
    comment: {},
    onCancel: () => { },
    onSave: () => { },
};

export default CommentEditor;