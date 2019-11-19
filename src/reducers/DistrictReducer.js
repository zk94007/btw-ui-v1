import DistrictConstants from '../constants/reducerConstants/DistrictConstants';
import InitialState from '../constants/InitialState';

export default function districtReducer(state = InitialState.districtList, action) {
	switch (action.type) {
		case DistrictConstants.DISTRICT_LIST_REQUEST: {
			return { ...state, isFetching: true }
		}
		case DistrictConstants.DISTRICT_LIST_SUCCESS: {
			return { ...state, ...{ districts: action.data.districts, isFetching: false, isSuccess: true, count: action.data.districts ? action.data.districts.length : 0 } };
		}
		case DistrictConstants.DISTRICT_LIST_ERROR: {
			return { ...state, ...{ error: action.error, isFetching: false, isSuccess: false } };
		}
		case DistrictConstants.DISTRICT_SEARCH_LIST_REQUEST: {
			return { ...state, isFetching: true }
		}
		case DistrictConstants.DISTRICT_SEARCH_LIST_SUCCESS: {
			return { ...state, ...{ districtSearchList: action.data, districts: [], isFetching: false, isSuccess: true } };
		}
		case DistrictConstants.DISTRICT_SEARCH_LIST_ERROR: {
			return { ...state, ...{ error: action.error, districtSearchList: [], districts: [], isFetching: false, isSuccess: false } };
		}
		case DistrictConstants.SELECTED_DISTRICT_ITEM: {
			return { ...state, ...{ selected: action.data } };
		}

		default:
			return state
	}
}