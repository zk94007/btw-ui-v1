import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AuthStorage from '../../../storage/AuthStorage'
import { BaseComponent, Button, Typography, UploadFileDialog, Spinner, SocialItem, ErrorAlarm } from '../../shared'
import { updateProfile, updateOnboardingBySource, importVotersFromFile } from '../../../actions';
import { FileItem } from './index';
import { storageKeys, LocalStorageManager as lsManager } from '../../../storage';

class SocialConnect extends BaseComponent {
    constructor() {
        super();
        this.state = {
            google: false,
            twitter: false,
            isUploadDialogShow: false,
            files: [],
            isImported: false,
            uploading: false,
            token: ''
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isGoogle || newProps.isTwitter) {
            this.setState({ isImported: true })
        }
    }

    isNofile = () => {
        return this.state.files.length === 0;
    };

    showResultHandler = () => {
        const { user, actions } = this.props;
        const { files } = this.state;

        files.forEach(file => (actions.importVotersFromFile(file)));
        actions.updateProfile(updateOnboardingBySource(user, true), true);
    };

    removeFileHandler = index => () => {
        const { files } = this.state;
        this.setState({ files: [...files.slice(0, index), ...files.slice(index + 1)] });
    };

    uploadButtonHandler = () => {
        this.setState({ isUploadDialogShow: true })
    };

    onSuccessUploadDialog = files => {
        this.setState({ files, isUploadDialogShow: false })
    };

    onCloseUploadDialog = () => {
        this.setState({ isUploadDialogShow: false })
    };

    socialItemRender = () => {
        const { isTwitter, isGoogle } = this.props;

        return (
            <div className='social-group'>
                <SocialItem
                    name='google'
                    status={isGoogle} />
                <SocialItem
                    name='twitter'
                    status={isTwitter} />
            </div>
        );
    };

    renderFileList = () => {
        const { files } = this.state;

        return (
            <div className='uploaded-file-list'>
                {files.map((file, index) => (
                    <FileItem key={index} file={file} onRemove={this.removeFileHandler(index)} />
                ))}
            </div>
        )

    };

    renderUploadContent = () => {
        return (
            <div className='content upload-content'>
                <Typography className='title'>Import your own voters list</Typography>
                <Typography variant='body' lightColor className='description'>
                    Already have a list of voters you want to work with ? Use it!
                </Typography>
                {this.isNofile() ?
                    <Typography variant='body' lightColor className='sub-description'>
                        Accepted formats: .csv, Excel (.xls, .xlsx)
                    </Typography> :
                    this.renderFileList()
                }
                <Button
                    color='white'
                    size='small'
                    onClick={this.uploadButtonHandler}
                    className='upload-button'>
                    Upload File
                </Button>
            </div>
        )
    };

    render() {
        const { isUploadDialogShow, uploading, isImported } = this.state;
        const { importSocialError, isImportSocialFetching } = this.props;

        return (
            <Container className='btw-social-connect btw-paper'>
                <ErrorAlarm error={importSocialError} hide={!importSocialError} showTop />
                <Spinner loading={uploading || isImportSocialFetching} />
                <div className='content'>
                    <Typography className='title'>Connect social accounts</Typography>
                    <Typography variant='body' lightColor className='description'>
                        Connect your favourite social media services
                        to find your friends among all the voters.
					</Typography>
                    {this.socialItemRender()}
                </div>
                {!this.isMobileOnly() && this.renderUploadContent()}
                <Button fullWidth onClick={this.showResultHandler} disabled={!isImported && this.isNofile()}>
                    Show Results
                </Button>
                <Button className='skip-button' onClick={this.showResultHandler} fullWidth>
                    Skip
                </Button>
                <UploadFileDialog
                    show={isUploadDialogShow}
                    onClose={this.onCloseUploadDialog}
                    onSuccess={this.onSuccessUploadDialog} />
            </Container >
        );
    }
}


const mapStateToProps = (state) => {
    const user = AuthStorage.getLoggedUser();
    const { isTwitter, isGoogle, importSocialError, isImportSocialFetching } = state.voterList;

    return {
        user,
        importSocialError,
        isImportSocialFetching,
        isTwitter: isTwitter || lsManager.getItem(storageKeys.twitterConnected),
        isGoogle: isGoogle || lsManager.getItem(storageKeys.googleConnected)
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateProfile, importVotersFromFile }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialConnect));