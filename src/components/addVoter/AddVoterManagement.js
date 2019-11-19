import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import _ from 'lodash';

import AuthStorage from '../../storage/AuthStorage';
import routes from '../../constants/Routes';
import { isAddedVoter } from '../../utility/VoterUtility';
import { addVotersToUser, fetchImportVoters, importVotersFromFile, loadVoterList, searchVotersByQuery } from '../../actions';
import {
    BaseComponent, Button, Typography, Dialog, VotersTable, SearchInput, Spinner,
    VotersProgressBar, SocialInfo, VoterNotFound, ConnectListInfo, UploadFileDialog, SocialConnectDialog
} from '../shared';

class AddVoterManagement extends BaseComponent {
    constructor() {
        super();
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                social: {
                    twitter: true,
                    google: false
                }
            },
            selectedVoters: [],
            showAlertModal: false,
            isUploadDialogShow: false,
            isSocialDialogShow: false,
            searchString: '',
            files: []
        }
    }

    componentDidMount() {
        this.props.actions.loadVoterList();
        this.props.actions.fetchImportVoters();
    }

    isNotConnected = () => {
        const { user: { social: { twitter, linkedIn, facebook } } } = this.state;
        return !(twitter || linkedIn || facebook);
    };

    getSearchData = () => {
        const { searchString } = this.state;
        const { importVoters, voters } = this.props;
        const voterList = importVoters.filter(voter => !isAddedVoter(voter, voters));

        return !!searchString ?
            voterList.filter(item => `${item.firstname} ${item.lastname}`.toLowerCase().includes(searchString.toLowerCase())) :
            voterList;
    };

    searchInputHandler = value => {
        this.props.actions.searchVotersByQuery(value);
        this.setState({ searchString: value });
    };

    clearSelectedVotersHandler = (id) => {
        let { selectedVoters } = this.state;

        if (id === 'all') {
            selectedVoters = [];
        } else {
            _.remove(selectedVoters, { id: id });
        }

        this.setState({ selectedVoters });
    };

    nextHandler = async () => {
        const { actions } = this.props;
        await actions.addVotersToUser(this.state.selectedVoters);
        this.onLink(routes.voterList);
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
    }

    onSuccessUploadDialog = files => {
        const { actions } = this.props;

        this.setState({ isUploadDialogShow: false, files: [...this.state.files, ...files] });
        files.forEach(file => (actions.importVotersFromFile(file)));
        actions.fetchImportVoters()
    }

    onCloseUploadDialog = () => {
        this.setState({ isUploadDialogShow: false })
    }

    onCloseSocialDialog = () => {
        this.setState({ isSocialDialogShow: false })
    }

    switchStatusHandler = (fileIndex) => { }

    renderDescription = () => {
        const { files } = this.state;
        const isNoFile = files.length === 0;

        if (!this.isNotConnected()) {
            return (
                <>
                    <Typography variant='body' lightColor className='page-description'>
                        Add more voters to your list. Select people among your social media
                        friends or search for other people you know among all the voters of your district.
                        {!isNoFile &&
                            <>
                                You can also <span onClick={this.importFilesHandler}> import your own list of voters</span>
                                , you would ike to work with.
                            </>
                        }
                    </Typography>
                    <Typography variant='body' lightColor className='page-description'>
                        Try to choose a few among <b>regular voters</b>, a few among
                        <b> infrequent voters</b>, and a few <b>unregistered voters</b>.
                    </Typography>
                </>
            );
        } else {
            return (
                <>
                    <Typography variant='body' lightColor className='page-description'>
                        Add more people to your list. Search for people you know among all the voters of your district.
                        Try to choose a few among <b>regular voters</b>, a few among <b>infrequent voters</b>,
                        and a few <b>unregistered voters</b>.
                    </Typography>
                    <Typography variant='body' lightColor className='page-description'>
                        To ease your searching process
                        <span onClick={this.socialConnectHandler}> connect your social media accounts</span>.
                        You can also <span onClick={this.importFilesHandler}>import your own list of voters</span>,
                        you would like to work with. Accepted formats: .csv, Excel (.xls, .xlsx)
                    </Typography>
                    <Typography variant='body' className='page-no-connect-description'>
                        To ease your searching process
                        <span onClick={this.socialConnectHandler}> connect your social media accounts.</span>
                    </Typography>
                </>
            );
        }
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
    }

    renderVotersProgressBar = (device) => {
        const { selectedVoters } = this.state;

        return (
            <VotersProgressBar
                color='blue'
                selectedVoters={selectedVoters}
                onClear={this.clearSelectedVotersHandler}
                onNext={this.nextHandler}
                type='add'
                className={`voter-progress-bar-${device}`} />
        );
    };

    renderNoDataText = (isNotConnected, isNoData) => {
        const { user, searchString } = this.state;

        return isNoData ?
            (<div className='social-no-data'>
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
                        type='add'
                        selectedData={selectedVoters}
                        onSelect={this.selectTableHandler} />
                </div>
            );
    };

    renderDialog = () => {
        const { showAlertModal } = this.state;

        return (
            <Dialog
                id='addedVotersAlertDialog'
                title='Add more voters to your list'
                show={showAlertModal}
                actionButtons={
                    <Button
                        fullWidth
                        id='addedVotersAlertDialog'
                        onClick={this.closeModalHandler}>
                        Ok, got it!
                    </Button>
                }
                onClose={this.closeModalHandler}
                className='bav-alert-dialog'>
                <div>
                    <Typography variant='body' lightColor className='mb-2'>
                        {this.isNotConnected() ?
                            `Search for people you know among all the voters of your district.` :
                            `We matched you with 40 of your social media friends.
                            Select people among your social media friends or search for
                            other people you know among all the voters of your district.`}
                    </Typography>
                    <Typography variant='body' lightColor>
                        Try to choose a few among <b>regular voters</b>,
                        a few among <b>infrequent voters</b>, and a few <b>unregistered voters</b>.
                    </Typography>
                </div>
            </Dialog>
        );
    };

    render() {
        const { isUploadDialogShow, isSocialDialogShow } = this.state;
        const { isFetchingVoters, isImportFetching } = this.props;

        return (
            <Container>
                <Spinner loading={isFetchingVoters || isImportFetching} />
                <Row className='btw-add-voters'>
                    <Col>
                        <Row>
                            <Col md={12} lg={9}>
                                {this.renderSocialInfo('tablet')}
                                <Typography className='page-title'>
                                    Add voters to your list
                                </Typography>
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
    const { isFetching: isFetchingVoters, isImportFetching, importVoters, voters } = state.voterList;

    return {
        user,
        voters,
        importVoters,
        isFetching,
        isFetchingVoters,
        isImportFetching,
        isSuccess
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        addVotersToUser,
        fetchImportVoters,
        importVotersFromFile,
        loadVoterList,
        searchVotersByQuery
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddVoterManagement));