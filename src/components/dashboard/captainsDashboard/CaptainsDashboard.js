import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import colors from '../../../constants/Colors';
import routes from '../../../constants/Routes';
import authStorage from '../../../storage/AuthStorage';
import {
    BaseComponent, ActionItem, Typography, VoterCardView, CongratsAlarm,
    SvgIcon, TaskCompleteDialog, ExtraCongratsDialog, Spinner
} from '../../shared';
import { loadVoterList, loadTaskList, resendConfirmationLink, updateProfile } from '../../../actions';

import {
    DashboardUserInfo,
    // ExtraPointTask, TopPerformers, PerformanceChart,
    WelcomeBanner,
    NoTaskBanner,
    ConfirmEmailMessage
} from './index';
import appDataTypes from "../../../constants/AppDataTypes";

const itemsCount = 4;

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            // performers: [
            //     {
            //         firstName: 'Denis',
            //         lastName: 'Damin',
            //         level: 'Captain',
            //         points: 35,
            //         activeTasks: 6,
            //         src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            //     },
            //     {
            //         firstName: 'Denis',
            //         lastName: 'Damin',
            //         level: 'Captain',
            //         points: 65,
            //         activeTasks: 56,
            //         src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            //     },
            //     {
            //         firstName: 'Denis',
            //         lastName: 'Damin',
            //         level: 'Captain',
            //         points: 45,
            //         activeTasks: 60,
            //         src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            //     }
            // ],
            // performanceData: {
            //     main: {
            //         startDate: 'Jun 24',
            //         endDate: 'Jun 30',
            //         data: [12, 5, 16, 12, 19, 21, 25]
            //     },
            //     previous: {
            //         startDate: 'Jun 17',
            //         endDate: 'Jun 23',
            //         data: [10, 7, 10, 22, 9, 9, 15]
            //     },
            //     points: {
            //         value: 150,
            //         percent: 2,
            //         isUp: false
            //     },
            //     activeTasks: {
            //         value: 75,
            //         percent: 10,
            //         isUp: true
            //     }
            // },
            selectedSubTask: {
                taskID: 0,
                status: 'inprogress',
                voter: {
                    firstName: 'Dennis',
                    lastName: 'Holman',
                    status: 'Regular', //not-registered, in-frequent, regular,
                    initials: 'DH',
                    street: 'New work Sr. 1289',
                    gender: 'Male',
                    src: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    }
                },
                comments: [
                    {
                        text: 'Asked Ann for Dennise’s phone number and she said she would email me.',
                        images: [],
                        createdAt: '2019-06-21T12:58:00.000+00:00'
                    },
                    {
                        text: 'Ann has sent me phone number, called Dennis. He explained me that he moved and wasn’t able to do the paperwork yet. Needs help with  the ballot later on.  ',
                        images: [
                            'https://images.unsplash.com/photo-1562113321-9dbe518626e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                            'https://images.unsplash.com/photo-1562119426-0b118d5965fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                            'https://images.unsplash.com/photo-1562113321-9dbe518626e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                            'https://images.unsplash.com/photo-1562119426-0b118d5965fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                            'https://images.unsplash.com/photo-1562113321-9dbe518626e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                            'https://images.unsplash.com/photo-1562119426-0b118d5965fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                        ],
                        createdAt: '2019-06-21T12:58:00.000+00:00'
                    }
                ],
                points: 4
            },
            isOpen: {
                performanceContent: false,
                taskContent: false,
                actionContent: false,
                voterContent: false
            },
            isFirstLogin: true,
            isNotifyMe: false,
            isConfirmEmail: true,
            isMarkDialogShow: false,
            isCongratDialogShow: false
        };

        const { actions: { loadVoterList, loadTaskList }} = this.props;

        loadVoterList();
        loadTaskList();
    }

    onSelectVoter = () => {
        this.onLink(routes.voterList);
    }

    onSelectTask = () => {
        this.onLink(routes.tasksList);
    }

    accordionHandler = (contentName) => () => {
        this.setState((prevState) => ({
            isOpen: {
                ...prevState.isOpen,
                [contentName]: !prevState.isOpen[contentName]
            }
        }));
    }

    onGotBannerHandler = () => {
        let { user, actions: { updateProfile }} = this.props;
        user.welcomeDashboardShown = true;
        updateProfile(user);
    }

    onNotifyHandler = () => {
        this.setState({ isNotifyMe: false });
    }

    onResendEmailHandler = () => {
        const { user, actions } = this.props;

        actions.resendConfirmationLink(user.email);
        this.setState({ isConfirmEmail: false });
    }

    onMarkHandler = () => {
        this.setState({ isMarkDialogShow: true });
    }

    showCongrateHandler = () => {
        this.setState({
            isMarkDialogShow: false,
            isCongratDialogShow: true
        })
    }

    renderWelcomeBanner = () => {
        const { isFirstLogin } = this.state;

        if (isFirstLogin) {
            return (
                <WelcomeBanner onGot={this.onGotBannerHandler} />
            )
        }
    }

    renderContentHeader = (title, linkName, route, contentName, isOpen) => {
        return (
            <div className='content-header'>
                <Typography className='content-title'>{title}</Typography>
                {!!linkName && <span className='view-all' onClick={() => this.onLink(route)}>{linkName}</span>}
                <SvgIcon
                    name={isOpen ? 'accordion-open' : 'accordion-close'}
                    onClick={this.accordionHandler(contentName)}
                    className='accordion-button'
                />
            </div>
        )
    }

    renderContentFooter = (linkName, route) => {
        return (
            <span className='view-all-mobile' onClick={() => this.onLink(route)}>{linkName}</span>
        )
    }

    renderCongrat = () => {
        const { isOpen: { performanceContent }, isFirstLogin } = this.state;

        if (!isFirstLogin) {
            return (
                <div className='content top-congrats'>
                    {this.renderContentHeader('Performance stats', '', '', 'performanceContent', performanceContent)}
                    <div className={classNames('content-body top-congrats', { 'content-inactive': !performanceContent })}>
                        <CongratsAlarm>
                            <Typography variant='body' color={colors['white']}>
                                Your result is better than of <b>75%</b> of Captains this week!
                            </Typography>
                            <Typography
                                variant='body'
                                fontWeight='600'
                                color={colors['white']}
                                className='congrat-link'
                                onClick={() => this.onLink(routes.leaderboard)}>
                                View Leaderboard
                            </Typography>
                        </CongratsAlarm>
                    </div>
                </div>
            )
        }
    }

    // renderPerfomance = () => {
    //     const { performers, performanceData, isOpen: { performanceContent }, isFirstLogin } = this.state
    //
    //     if (!isFirstLogin) {
    //         return (
    //             <div className='content'>
    //                 <Row className={classNames('content-body', { 'content-inactive': !performanceContent })}>
    //                     <Col xs={12} lg={6}>
    //                         <PerformanceChart performanceData={performanceData} />
    //                     </Col>
    //                     <Col xs={12} lg={6}>
    //                         <TopPerformers performers={performers} />
    //                     </Col>
    //                 </Row>
    //             </div>
    //         );
    //     }
    // }

    // renderTasks = () => {
    //     const { tasks, isOpen: { taskContent } } = this.state
    //
    //     return (
    //         <div className='content'>
    //             {this.renderContentHeader('Today’s extra points tasks', '', '', 'taskContent', taskContent)}
    //             <div className={classNames('content-body', { 'content-inactive': !taskContent })}>
    //                 <Row>
    //                     <Col xs={12} md={6}>
    //                         <ExtraPointTask task={tasks[0]} color='dark' onMark={this.onMarkHandler} />
    //                     </Col>
    //                     <Col xs={12} md={6}>
    //                         <ExtraPointTask task={tasks[1]} onMark={this.onMarkHandler} />
    //                     </Col>
    //                 </Row>
    //             </div>
    //         </div>
    //     );
    // }

    renderActions = () => {
        const { tasks } = this.props;
        const { isOpen: { actionContent } } = this.state;

        return (
            <div className='content'>
                {this.renderContentHeader('Actions in progress', 'All Actions', routes.tasksList, 'actionContent', actionContent)}
                <div className={classNames('content-body', { 'content-inactive': !actionContent })}>
                    <Row>
                        {
                            tasks.slice(0, itemsCount).map((task, index) => {
                                return (
                                    <Col sm={6} lg={3} key={index}>
                                        <ActionItem task={task} onSelectTask={this.onSelectTask} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    {this.renderContentFooter('All Actions', routes.tasksList)}
                </div>
            </div>
        );
    }

    renderVoters = () => {
        const { voters } = this.props;
        const { isOpen: { voterContent } } = this.state;

        return (
            <div className='content'>
                {this.renderContentHeader('Your voters', 'All Voters', routes.voterList, 'voterContent', voterContent)}
                <div className={classNames('content-body', { 'content-inactive': !voterContent })}>
                    <Row>
                        {
                            voters.slice(0, itemsCount).map((voter, index) => {
                                return (
                                    <Col xs={12} lg={6} key={index}>
                                        <VoterCardView data={voter} onSelectItem={this.onSelectVoter} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    {this.renderContentFooter('All Voters', routes.voterList)}
                </div>
            </div>
        );
    }

    renderTaskCompleteDialog = () => {
        const { isMarkDialogShow, selectedSubTask } = this.state;

        if (isMarkDialogShow) {
            return (
                <TaskCompleteDialog show={isMarkDialogShow}
                    selectedSubTask={selectedSubTask}
                    onClose={() => this.setState({ isMarkDialogShow: false })}
                    onMarkAsDone={this.showCongrateHandler} />
            )
        }
    }

    renderExtraCongratsDialog = () => {
        const { isCongratDialogShow } = this.state;

        if (isCongratDialogShow) {
            return (
                <ExtraCongratsDialog show={isCongratDialogShow}
                    onClose={() => this.setState({ isCongratDialogShow: false })}
                />
            )
        }
    }

    componentWillReceiveProps(props) {
        const { user: { welcomeDashboardShown }} = props;
        const { isFirstLogin } = this.state;

        if (isFirstLogin === welcomeDashboardShown) {
            this.setState({ isFirstLogin: !welcomeDashboardShown });
        }
    }

    render() {
        const { isNotifyMe } = this.state;
        const { user, tasks, voters, resendEmail = {}, isUserFetching } = this.props;
        const isConfirmed = this.isEmailConfirmed(user) || isUserFetching;

        return (
            <Container className='btw-captains-dashboard'>
                <Spinner loading={isUserFetching} />
                <ConfirmEmailMessage email={user.email}
                                     isShow={!isConfirmed}
                                     isEmailSent={resendEmail.isSuccess}
                                     onConfirm={this.onResendEmailHandler} />
                <div className={classNames({ 'main-content-opacity': !isConfirmed })}>
                    <Row className='user-info-content'>
                        <Col md={5} lg={6} className='main-title'>
                           {/* <Typography>{`Welcome back, ${user.firstName}!`}</Typography>
                            <Typography lightColor variant="body">Nice to meet you again.</Typography>*/}
                        </Col>
                        <Col md={7} lg={6} className='p-0'>
                            <DashboardUserInfo user={user}
                                               activeTasks={tasks.length}
                                               voterCounts={voters.length} />
                        </Col>
                    </Row>
                    {
                        isNotifyMe ?
                            <NoTaskBanner onNotify={this.onNotifyHandler} /> :
                            <>
                                {this.renderWelcomeBanner()}
                                {this.renderCongrat()}
                                {/*{this.renderPerfomance()}*/}
                                {/*{this.renderTasks()}*/}
                                {this.renderActions()}
                                {this.renderVoters()}
                            </>
                    }
                </div>
                {this.renderTaskCompleteDialog()}
                {this.renderExtraCongratsDialog()}
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    const { voterList: { voters }, taskList: { tasks} } = state;
    const { sub, email }  = authStorage.getLoggedUser();
    const stateUser = state.app[appDataTypes.profile];

    return {
        user: { ...{ sub, email }, ...stateUser.data || {}},
        isUserFetching: stateUser.isFetching,
        resendEmail: state.app[appDataTypes.resendConfirmationLink],
        voters,
        tasks
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
      loadVoterList,
      loadTaskList,
      resendConfirmationLink,
      updateProfile,
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CaptainsDashboard));