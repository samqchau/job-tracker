import {
  USER_APPS_REQUEST,
  USER_APPS_SUCCESS,
  USER_APPS_FAIL,
  USER_APPS_RESET,
  POST_APP_REQUEST,
  POST_APP_SUCCESS,
  POST_APP_FAIL,
} from '../constants/appConstants';

export const userAppsReducer = (state = { apps: [] }, action) => {
  switch (action.type) {
    case USER_APPS_REQUEST:
      return { ...state, loading: true };
    case USER_APPS_SUCCESS:
      return { ...state, loading: false, apps: action.payload, success: true };
    case USER_APPS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_APPS_RESET:
      return { apps: [] };
    default:
      return { ...state };
  }
};

export const postAppReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_APP_REQUEST:
      return { loading: true };
    case POST_APP_SUCCESS:
      return { loading: false, success: true };
    case POST_APP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
