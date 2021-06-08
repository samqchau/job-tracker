import axios from 'axios';
import {
  USER_APPS_REQUEST,
  USER_APPS_SUCCESS,
  USER_APPS_FAIL,
  POST_APP_REQUEST,
  POST_APP_SUCCESS,
  POST_APP_FAIL,
} from '../constants/appConstants';

export const fetchUserApps = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_APPS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let { data } = await axios.get('/api/apps', config);
    data.sort((a, b) => a.index - b.index);
    dispatch({ type: USER_APPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_APPS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addAppToList = (application) => async (dispatch, getState) => {
  dispatch({ type: POST_APP_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let { data } = await axios.post('/api/apps', application, config);
    dispatch({ type: POST_APP_SUCCESS });
    const {
      userApps: { apps },
    } = getState();
    let newApps = apps;
    newApps.forEach((app) => {
      if (app.list === application.list) {
        app.index++;
      }
    });
    newApps.sort((a, b) => a.list - b.list);
    newApps.sort((a, b) => a.index - b.index);
    dispatch({ type: USER_APPS_SUCCESS, payload: [data, ...newApps] });
  } catch (error) {
    dispatch({
      type: POST_APP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
