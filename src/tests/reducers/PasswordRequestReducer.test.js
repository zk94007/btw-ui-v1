import { expect } from 'chai';

import passwordRequestReducer from '../../reducers/PasswordRequestReducer';
import PasswordRequestContants from '../../constants/reducerConstants/PasswordRequestConstants';
import InitialState from '../../constants/InitialState';

describe('forgotPasswordRequest', () => {

    it('should return the forgotPasswordRequest request', () => {
        expect(passwordRequestReducer(InitialState.request, {
            type: PasswordRequestContants.PASSWORD_RESET_REQUEST
        }).isFetching).to.be.true
    });

    it('should return the forgotPasswordRequest success', () => {
        expect(passwordRequestReducer(InitialState.request, {
            type: PasswordRequestContants.PASSWORD_RESET_SUCCEEDED,
            isUserFound: true
        })).to.deep.equal({
            isUserFound: true,
            isFetching: false
        })
    });

    it('should return the forgotPasswordRequest failure', () => {
        expect(passwordRequestReducer(InitialState.request, {
            type: PasswordRequestContants.PASSWORD_RESET_FAILED
        })).to.deep.equal({
            isUserFound: false,
            isFetching: false
        })
    });
})

describe('verifyTokenRequest', () => {

    it('should return the verifyTokenRequest success', () => {
        expect(passwordRequestReducer(InitialState.request, {
            type: PasswordRequestContants.VERIFY_TOKEN_SUCCEEDED
        })).to.deep.equal({
            isValidToken: true
        })
    });

    it('should return the forgotPasswordRequest failure', () => {
        expect(passwordRequestReducer(InitialState.request, {
            type: PasswordRequestContants.VERIFY_TOKEN_FAILED
        })).to.deep.equal({
            isValidToken: false
        })
    });
})

describe('changePasswordRequest', () => {

    it('should return the changePasswordRequest success', () => {
        expect(passwordRequestReducer(InitialState.request, {
            type: PasswordRequestContants.CHANGE_PASSWORD_SUCCEEDED
        })).to.deep.equal({
            isChangedPassword: true
        })
    });

    it('should return the forgotPasswordRequest failure', () => {
        expect(passwordRequestReducer(InitialState.request, {
            type: PasswordRequestContants.CHANGE_PASSWORD_FAILED
        })).to.deep.equal({
            isChangedPassword: false
        })
    });
})
