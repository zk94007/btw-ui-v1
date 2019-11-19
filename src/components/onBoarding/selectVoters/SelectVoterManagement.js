import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import _ from 'lodash';

import AuthStorage from '../../../storage/AuthStorage'
import {
    BaseComponent,
    Button,
    Typography,
    Dialog,
    VotersTable,
    SearchInput,
    VotersProgressBar,
    SocialInfo,
    VoterNotFound,
    ConnectListInfo,
    UploadFileDialog,
    SocialConnectDialog,
    Spinner
} from '../../shared';
import {
    updateProfile,
    updateOnboardingByVoter,
    addVotersToUser,
    fetchImportVoters,
    importVotersFromFile,
    searchVotersByQuery,
    actionImportSuccess
} from '../../../actions';

import { storageKeys, LocalStorageManager as lsManager } from '../../../storage';

class SelectVoterManagement extends BaseComponent {
    constructor(props) {
        super(props);
        const { pathname } = this.props.location;
        const showSocialDialog = lsManager.getItem(storageKeys.socialConnectFrom) === pathname;

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                social: {
                    twitter: true,
                    linkedIn: false,
                    facebook: false
                }
            },
            selectedVoters: [],
            showAlertModal: false,
            isUploadDialogShow: false,
            isSocialDialogShow: showSocialDialog,
            searchString: '',
            files: []
        };
    }

    componentWillMount() {
        this.props.actions.fetchImportVoters();
    }

    isNotConnected = () => {
        const { user: { social: { twitter, linkedIn, facebook } } } = this.state;
        return !(twitter || linkedIn || facebook);
    };

    getSearchData = () => {
        const { searchString } = this.state;
        const { importVoters } = this.props;

        return !!searchString ?
            importVoters.filter(item => `${item.firstname} ${item.lastname}`.toLowerCase().includes(searchString.toLowerCase())) :
            importVoters;
    };

    searchInputHandler = value => {
        const { searchVotersByQuery } = this.props.actions;
        searchVotersByQuery(value);
        this.setState({ searchString: value });
    };

    clearSelectedVotersHandler = (id) => {
        let { selectedVoters } = this.state;

        if (id === 'all') {
            selectedVoters = [];
        } else {
            _.remove(selectedVoters, { id });
        }

        this.setState({ selectedVoters });
    };

    nextHandler = () => {
        const { user, actions } = this.props;
        const { selectedVoters } = this.state;
        actions.addVotersToUser(selectedVoters);
        actions.updateProfile(updateOnboardingByVoter(user, true), true);
    };

    closeModalHandler = () => {
        this.setState({ showAlertModal: false });
    };

    selectTableHandler = (selectedVoters) => {
        this.setState({ selectedVoters });
    };

    socialConnectHandler = () => {
        this.setState({ isSocialDialogShow: true })
    };

    importFilesHandler = () => {
        this.setState({ isUploadDialogShow: true });
    };

    onSuccessUploadDialog = files => {
        const { actions } = this.props;

        this.setState({ isUploadDialogShow: false, files: [...this.state.files, ...files] });
        files.forEach(file => (actions.importVotersFromFile(file)));
        actions.fetchImportVoters()
    };

    onCloseUploadDialog = () => {
        this.setState({ isUploadDialogShow: false })
    };

    onCloseSocialDialog = () => {
        this.setState({ isSocialDialogShow: false })
    };

    switchStatusHandler = (fileIndex) => { }

    renderDescription = () => {
        return (
            <>
                <Typography className='page-title'>
                    Add 10 voters to your list
                </Typography>
                <Typography variant='body' lightColor className='page-description'>
                    Select <b>10 people</b> among your social media friends or search
                    for other people you know among all the voters of your district.
                    Try to choose a few among <b>regular voters</b>, a few among
                    <b> infrequent voters</b>, and a few <b>unregistered voters</b>.
                </Typography>
                {this.isNotConnected() &&
                    <Typography variant='body' className='page-no-connect-description'>
                        To ease your searching process
                        <span onClick={this.socialConnectHandler}> connect your social media accounts.</span>
                    </Typography>
                }
            </>
        );
    };

    renderSocialInfo = (device) => {
        const { user } = this.state;

        if (!this.isNotConnected()) {
            return (
                <SocialInfo
                    social={user.social}
                    onSocialConnect={this.socialConnectHandler}
                    className={`social-info-${device}`} />
            );
        }
    };

    renderConnectListInfo = () => {
        const { files } = this.state;

        return (
            <ConnectListInfo
                files={files}
                importFiles={this.importFilesHandler}
                switchStatus={this.switchStatusHandler}
                className='connect-list-info' />
        )
    };

    renderVotersProgressBar = (device) => {
        const { selectedVoters } = this.state;

        return (
            <VotersProgressBar
                color='blue'
                selectedVoters={selectedVoters}
                onClear={this.clearSelectedVotersHandler}
                onNext={this.nextHandler}
                className={`voter-progress-bar-${device}`} />
        );
    };

    renderNoDataText = (isNotConnected, isNoData) => {
        const { user, searchString } = this.state;

        return isNoData ?
            (<div className='social-no-data' >
                <VoterNotFound searchString={searchString} />
            </div>) :
            (<div className='social-no-connect'>
                <SocialInfo
                    social={user.social}
                    onSocialConnect={this.socialConnectHandler}
                    noConnect={isNotConnected} />
            </div>);
    };

    renderTable = () => {
        const { selectedVoters, searchString } = this.state;
        const data = this.getSearchData();
        const isNotConnected = this.isNotConnected();
        const isNoData = data.length === 0;

        return isNotConnected || isNoData ?
            this.renderNoDataText(isNotConnected, isNoData) :
            (
                <div className='btw-paper table-container'>
                    <Typography variant='body' lightColor fontWeight='600' className='table-description'>
                        {!!searchString ?
                            `We found ${data.length} results for “${searchString}”` :
                            `Hurray! We matched you with ${data.length} of your friends.`
                        }
                    </Typography>
                    <VotersTable
                        data={data}
                        selectedData={selectedVoters}
                        onSelect={this.selectTableHandler} />
                </div>
            );
    };

    renderDialog = () => {
        const { showAlertModal } = this.state;

        return (
            <Dialog
                id='selectedVotersAlertDialog'
                title='Hurray! We matched you with 40 of your friends.'
                show={showAlertModal}
                actionButtons={
                    <Row>
                        <Col xs={12}>
                            <Button
                                fullWidth
                                id='selectedVotersAlertDialog'
                                onClick={this.closeModalHandler}>
                                Ok, got it!
                            </Button>
                        </Col>
                    </Row>
                }
                onClose={this.closeModalHandler}>
                <div>
                    <Typography variant='body' displayInline lightColor>
                        Select 10 people among your social media friends or search
                        for other people you know among all the voters of your district.
                    </Typography>
                    <Typography variant='body' displayInline lightColor>
                        Try to choose a few among regular voters, a few among
                        infrequent voters, and a few unregistered voters.
                    </Typography>
                </div>
            </Dialog>
        );
    };

    render() {
        const { isUploadDialogShow, isSocialDialogShow } = this.state;
        const { isImportFetching } = this.props;

        return (
            <Container>
                <Row className='btw-select-voters'>
                    <Spinner loading={isImportFetching} />
                    <Col>
                        <Row>
                            <Col md={12} lg={9}>
                                {this.renderSocialInfo('tablet')}
                                {this.renderDescription()}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={9}>
                                <Row>
                                    <Col>
                                        <SearchInput
                                            placeholder='Search by name or address'
                                            onChange={this.searchInputHandler}
                                            className='search-input' />
                                        {this.renderTable()}
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} lg={3}>
                                {this.renderVotersProgressBar('desktop')}
                                {this.renderConnectListInfo()}
                                {this.renderSocialInfo('desktop')}
                            </Col>
                        </Row>
                    </Col>
                    {this.renderVotersProgressBar('tablet')}
                </Row >
                {this.renderDialog()}
                <UploadFileDialog
                    show={isUploadDialogShow}
                    onClose={this.onCloseUploadDialog}
                    onSuccess={this.onSuccessUploadDialog} />
                <SocialConnectDialog
                    show={isSocialDialogShow}
                    onClose={this.onCloseSocialDialog} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const user = AuthStorage.getLoggedUser();
    const { isFetching, isSuccess } = state.user;
    const { importVoters, isImportFetching } = state.voterList;

    return {
        user,
        importVoters,
        isFetching,
        isImportFetching,
        isSuccess
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        updateProfile,
        addVotersToUser,
        fetchImportVoters,
        importVotersFromFile,
        searchVotersByQuery,
        actionImportSuccess
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectVoterManagement));
