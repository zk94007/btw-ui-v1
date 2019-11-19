import DistrictConstants from '../constants/reducerConstants/DistrictConstants';
import districtService from '../services/DistrictService';

export {
  getDistrictByAddress,
  getDistrictSearchList,
  selectDistrict
}

const SEARCH_LIST_COUNT = 5;
function getDistrictSearchList(address) {
  return dispatch => {
    dispatch(actionRequest());
    return districtService.getDistrictByAddress(address).then(
      response => {
        const { districts } = response;
        const searchList = [...districts.slice(0, districts.length > SEARCH_LIST_COUNT ? SEARCH_LIST_COUNT : districts.length)];
        dispatch(actionSuccess(searchList));
      },
      error => {
        dispatch(actionError(error.data.message));
      });
  };

  function actionRequest() {
    return { type: DistrictConstants.DISTRICT_SEARCH_LIST_REQUEST };
  }
  function actionError(error) {
    return { type: DistrictConstants.DISTRICT_SEARCH_LIST_ERROR, error };
  }

  function actionSuccess(data) {
    return { type: DistrictConstants.DISTRICT_SEARCH_LIST_SUCCESS, data };
  }
}

function getDistrictByAddress(address) {
  return dispatch => {
    dispatch(actionRequest());
    return districtService.getDistrictByAddress(address).then(
      response => {
        dispatch(actionSuccess(response));
      },
      error => {
        dispatch(actionError(error.data.message));
      });
  };

  function actionRequest() {
    return { type: DistrictConstants.DISTRICT_LIST_REQUEST };
  }
  function actionError(error) {
    return { type: DistrictConstants.DISTRICT_LIST_ERROR, error };
  }

  function actionSuccess(data) {
    return { type: DistrictConstants.DISTRICT_LIST_SUCCESS, data };
  }
}

function selectDistrict(data) {
  return { type: DistrictConstants.SELECTED_DISTRICT_ITEM, data };
}
