import {
  USER_APPS_REQUEST,
  USER_APPS_SUCCESS,
  USER_APPS_FAIL,
} from '../constants/appConstants';

export const userAppsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_APPS_REQUEST:
      return { loading: true };
    case USER_APPS_SUCCESS:
      return { loading: false, apps: action.payload };
    case USER_APPS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
