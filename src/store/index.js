import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { loadState, saveState } from '../storage/StateStorage';
import authStorage from '../storage/AuthStorage';
import roles from '../constants/Roles';
import initialState from '../constants/InitialState';
import appConstants from '../constants/reducerConstants/AppConstants';
import reducers from '../reducers';

const combinedReducers = combineReducers(reducers);
const rootReducer = (state, action) => {
    if (action.type === appConstants.USER_LOGOUT) {
        state = initialState;
    }
    return combinedReducers(state, action)
};

export default {
	configure: () => {
		const persistedState = loadState();
		let store = createStore(rootReducer, persistedState, applyMiddleware(thunk, logger));

		store.subscribe(() => {
			if (authStorage.getCurrentRole() === roles.captain) {
                saveState({
                    voter: store.getState().voter
                });
			}
		});

		return  store
	}
}
