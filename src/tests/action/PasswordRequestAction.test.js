import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import {
    forgotPasswordRequest,
    verifyTokenRequest,
    changePasswordRequest
} from '../../actions/ChangePasswordActions';

import PasswordRequestContants from '../../constants/reducerConstants/PasswordRequestConstants';
import InitialState from '../../constants/InitialState';
import config from '../../config/ApiConfig';

/* Test Forget Passsword Request */
describe('forgotPasswordRequest tests', () => {

    /* Success test */
    describe('Success', () => {

        const request = {
            'email': 'email@test.com'
        }

        const response = {
            'status': 200,
            'message': 'Request processed successfully'
        }

        const isUserFound = true;

        it('it should dispatch a success', () => {
            let mockAdapter = new MockAdapter(axios);
            mockAdapter.onPost(`${config.apiHost}/user/resetPassword/sendEmail`).reply(200, response);

            const expectedActions = [
                { type: PasswordRequestContants.PASSWORD_RESET_REQUEST },
                {
                    type: PasswordRequestContants.PASSWORD_RESET_SUCCEEDED,
                    isUserFound: isUserFound
                }
            ];

            const store = mockStore(InitialState);
            return store.dispatch(forgotPasswordRequest(request)).then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions)
            })
        })
    })

    /* Failure Test */
    describe('Failure', () => {

        const request = {
            'email': 'email@test.com'
        }

        const error = {
            'status': 404,
            'message': 'Not Found'
        }

        it('it should dispatch a failure', () => {
            let mockAdapter = new MockAdapter(axios);
            mockAdapter.onPost(`${config.apiHost}/user/resetPassword/sendEmail`).reply(404, error);

            const expectedActions = [
                {
                    type: PasswordRequestContants.PASSWORD_RESET_REQUEST
                },
                {
                    type: PasswordRequestContants.PASSWORD_RESET_FAILED
                }
            ];

            const store = mockStore(InitialState);
            return store.dispatch(forgotPasswordRequest(request)).then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions)
            })
        })
    })
})

/* Test Verify Token Request */
describe('verifyTokenRequest tests', () => {

    /* Success test */
    describe('Success', () => {

        const request = {
            'token': '07d341c8-c7fe-42fb-a052-e1f9f483ad0f'
        }

        const response = {
            'status': 200,
            'message': 'Reset password token is valid',
            'isValid': true
        }

        it('it should dispatch a success', () => {
            let mockAdapter = new MockAdapter(axios);
            mockAdapter.onGet(`${config.apiHost}/user/resetPassword/check/${request.token}`).reply(200, response);

            const expectedActions = [
                {
                    type: PasswordRequestContants.VERIFY_TOKEN_SUCCEEDED
                }
            ];

            const store = mockStore(InitialState);
            return store.dispatch(verifyTokenRequest(request.token)).then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions)
            })
        })
    })

    /* Failure Test */
    describe('Failure', () => {

        const request = {
            'token': '07d341c8-c7fe-42fb-a052-e1f9f483ad0f'
        }

        const error = {
            'status': 404,
            'message': 'Password reset token is invalid or has expired',
            'isValid': false
        }

        it('it should dispatch a failure', () => {
            let mockAdapter = new MockAdapter(axios);
            mockAdapter.onGet(`${config.apiHost}/user/resetPassword/check/${request.token}`).reply(404, error);

            const expectedActions = [
                {
                    type: PasswordRequestContants.VERIFY_TOKEN_FAILED
                }
            ];

            const store = mockStore(InitialState);
            return store.dispatch(verifyTokenRequest(request)).then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions)
            })
        })
    })
})

/* Test Change Password Request */
describe('changePasswordRequest tests', () => {

    /* Success test */
    describe('Success', () => {

        const request = {
            'resetPasswordToken': '1219d9c1-9c7d-45f9-beb0-5cbe42477611',
            'newPassword': 'tH32ka!32n#kLKi'
        }

        const response = {
            'status': 200,
            'message': 'Password restored successfully'
        }


        it('it should dispatch a success', () => {
            let mockAdapter = new MockAdapter(axios);
            mockAdapter.onPost(`${config.apiHost}/user/resetPassword/reset`).reply(200, response);

            const expectedActions = [
                {
                    type: PasswordRequestContants.CHANGE_PASSWORD_SUCCEEDED
                }
            ];

            const store = mockStore(InitialState);
            return store.dispatch(changePasswordRequest(request)).then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions)
            })
        })
    })

    /* Failure Test */
    describe('Failure', () => {

        const request = {
            'resetPasswordToken': '1219d9c1-9c7d-45f9-beb0-5cbe42477611',
            'newPassword': 'tH32ka!32n#kLKi'
        }

        const error = {
            'status': 404,
            'message': 'Password reset token is invalid or has expired'
        }

        it('it should dispatch a failure', () => {
            let mockAdapter = new MockAdapter(axios);
            mockAdapter.onPost(`${config.apiHost}/user/resetPassword/reset`).reply(404, error);

            const expectedActions = [
                {
                    type: PasswordRequestContants.CHANGE_PASSWORD_FAILED,
                }
            ];
            const store = mockStore(InitialState);
            return store.dispatch(changePasswordRequest(request)).then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions)
            })
        })
    })
})
