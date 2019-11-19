import React from 'react'
import PropTypes from 'prop-types'

import taskService from '../../../services/TaskService';
import profileImage from '../../../resources/icons/profile.png';
import { BaseComponent, Typography, ButtonLink, Button, VoterAvatar, SvgIcon } from '../../shared'
import { DragDropImageUpload, ProfileAvatarOption, UploadPhotoItem, SaveChangeDialog } from './index'

class ProfileAvatar extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShowOption: false,
            isShowLeaveModal: false,
            option: '',
            file: undefined,
            imageUrl: '',
            isUploading: false
        }
    }

    isUploadPhoto = () => {
        return this.state.option === 'upload';
    }

    onOptionHandler = (option) => {
        this.setState({ option })
    }

    onUpdateButtonHandler = () => {
        this.setState({ isShowOption: true })
    }

    onCancelButtonHandler = () => {
        this.setState({ isShowLeaveModal: true })
    }

    removePhotoHandler = () => {
        this.setState({ file: undefined, imageUrl: '' });
    }

    onStayHandler = () => {
        this.setState({ isShowLeaveModal: false })
    }

    onLeaveHandler = () => {
        this.setState({ isShowLeaveModal: false, isShowOption: false, option: '' })
        this.removePhotoHandler();
        this.props.onUploadImage('');
    }

    onChangeUpload = files => {
        const file = files[0];

        taskService.uploadFile(file).then(
            response => {
                const { imageUrl } = response;
                this.setState({ file, imageUrl });
                this.props.onUploadImage(imageUrl);
            });
    }

    renderAvatarContainer = () => {
        const { imageUrl } = this.state;
        const { user } = this.props;

        if (!!imageUrl) {
            return <VoterAvatar
                src={imageUrl}
                size={50}
                noBorder />
        }

        return this.isUploadPhoto() ?
            <div className='upload-avatar'>
                <SvgIcon width={30} height={30} name='add-photo-to-upload' />
            </div> :
            <VoterAvatar
                src={user.profileImageUrl || profileImage}
                size={50}
                noBorder />
    }

    renderUploadContainer = () => {
        const { file, isUploading } = this.state;

        if (this.isUploadPhoto()) {
            if (!file) {
                return isUploading ?
                    <Typography variant='body' lightColor>Uploading...</Typography> :
                    <DragDropImageUpload onChange={this.onChangeUpload} />
            } else {
                return <UploadPhotoItem file={file} onRemove={this.removePhotoHandler} />
            }
        }
    }

    renderUpdateContainer = () => {
        const { isShowOption } = this.state;

        if (isShowOption) {
            return (
                <div className='update-container'>
                    <div className='option-container'>
                        <ProfileAvatarOption onOptionChange={this.onOptionHandler} />
                        {this.renderUploadContainer()}
                    </div>
                    <ButtonLink
                        className='avatar-cancel-button'
                        label={'Cancel'}
                        onClick={this.onCancelButtonHandler} />
                </div>
            )
        }
    }

    render() {
        const { isShowOption, isShowLeaveModal } = this.state;

        return (
            <div className='btw-profile-picture'>
                <Typography variant='functional' fontWeight='600'>
                    Profile Picture
                </Typography>
                <div className='picture-container'>
                    <div className='avatar-placeholder'>
                        {this.renderAvatarContainer()}
                        {!isShowOption &&
                            <Button
                                size='small'
                                className='photo-button'
                                color='white'
                                onClick={this.onUpdateButtonHandler}>
                                Update Photo
                            </Button>
                        }
                    </div>
                    {this.renderUpdateContainer()}
                </div>
                <SaveChangeDialog
                    open={isShowLeaveModal}
                    onStay={this.onStayHandler}
                    onLeave={this.onLeaveHandler}
                />
            </div>
        )
    }
}

ProfileAvatar.propTypes = {
    onUploadImage: PropTypes.func.isRequired
}

ProfileAvatar.defaultProps = {
    onUploadImage: () => { }
}

export default ProfileAvatar