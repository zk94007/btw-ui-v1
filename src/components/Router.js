import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from './auth/signIn';
import SignUp from './auth/signUp';
import GeneralErrorPage from './errorPages/GeneralErrorPage';
import ChangePassword from './auth/changePassword/changePassword';
import ForgotPassword from './auth/changePassword/forgotPassword';
import VerifyEmail from './verifyEmail/VerifyEmail';

import TasksManagement from './tasksList';
import TaskDetail from './tasksList/taskDetail';
import VotersManagement from './voterList';
import AddVoterManagement from './addVoter';
import VoterDetail from './voterList/VoterDetailView';
import { Profile } from './setting';
import ReceiveFromGoogle from './onBoarding/socialConnectReceivers/ReceiveFromGoogle';
import ReceiveFromTwitter from './onBoarding/socialConnectReceivers/ReceiveFromTwitter';

import WelcomePage from './onBoarding/WelcomePage';
import SocialConnect from './onBoarding/socialNetworks/SocialConnect';
import SelectDistrict from './onBoarding/selectDistrict/SelectDistrict';
import SelectVoterManagement from './onBoarding/selectVoters';

import { CaptainsDashboard, Leaderboard } from './dashboard';
import HelpCenter from './helpCenter';

import TermsAndConditions from './static/termsAndConditions';
import PrivacyPolicy from './static/privacyPolicy';
import CorsCallBack from './static/corsCallBack';

import { Promo, FAQ, BecomeCaptain, ThankYou } from './promoPages';

import Authorization from './hocs/Authorization';
import routes from '../constants/Routes';
import roles from '../constants/Roles';

const { captain, guest } = roles;

const router = () => (
    <Switch>
        {/* auth */}
        <Route exact path={routes.signIn} component={Authorization(SignIn, [guest])} />
        <Route exact path={routes.signUp} component={Authorization(SignUp, [guest])} />
        <Route exact path={routes.pageDown} component={GeneralErrorPage} />
        <Route exact path={routes.changePassword} component={ChangePassword} />
        <Route exact path={routes.forgotPassword} component={ForgotPassword} />
        <Route exact path={routes.verifyEmail} component={Authorization(VerifyEmail, [captain])} />

        {/* on boarding */}
        <Route exact path={routes.selectVoters} component={Authorization(SelectVoterManagement, [captain])} />
        <Route exact path={routes.welcome} component={Authorization(WelcomePage, [captain])} />
        <Route exact path={routes.selectDistrict} component={Authorization(SelectDistrict, [captain])} />
        <Route exact path={routes.socialConnect} component={Authorization(SocialConnect, [captain])} />

        <Route exact path={routes.tasksList} component={Authorization(TasksManagement, [captain])} />
        <Route exact path={routes.taskDetail} component={Authorization(TaskDetail, [captain])} />
        <Route exact path={routes.voterList} component={Authorization(VotersManagement, [captain])} />
        <Route exact path={routes.voterDetail} component={Authorization(VoterDetail, [captain])} />

        <Route exact path={routes.addVoter} component={Authorization(AddVoterManagement, [captain])} />
        <Route exact path={routes.helpCenter} component={Authorization(HelpCenter, [captain])} />
        <Route exact path={routes.captainsDashboard} component={Authorization(CaptainsDashboard, [captain])} />
        <Route exact path={routes.leaderboard} component={Authorization(Leaderboard, [captain])} />
        <Route exact path={routes.profile} component={Authorization(Profile, [captain])} />
        <Route exact path={routes.connectGoogle} component={Authorization(ReceiveFromGoogle, [captain])} />
        <Route exact path={routes.connectTwitter} component={Authorization(ReceiveFromTwitter, [captain])} />

        {/* static pages */}
        <Route exact path={routes.termsAndConditions} component={TermsAndConditions} />
        <Route exact path={routes.privacyPolicy} component={PrivacyPolicy} />
        <Route exact path={routes.corsCallBack} component={CorsCallBack} />

        {/* promo pages */}
        <Route exact path={routes.main} component={Authorization(Promo, [guest])} />
        <Route exact path={routes.faq} component={Authorization(FAQ, [guest])} />
        <Route exact path={routes.becomeCaptain} component={Authorization(BecomeCaptain, [guest])} />
        <Route exact path={routes.thankYou} component={Authorization(ThankYou, [guest])} />

        <Route exact path='*' component={Authorization(() => null)} />
    </Switch>
);

export default router;