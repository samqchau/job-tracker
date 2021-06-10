import axios from 'axios';
import {
  USER_APPS_REQUEST,
  USER_APPS_SUCCESS,
  USER_APPS_FAIL,
  POST_APP_REQUEST,
  POST_APP_SUCCESS,
  POST_APP_FAIL,
} from '../constants/appConstants';
import listNameValuePairs from '../data/lookUpTables/listNameValuePairs';

export const fetchUserApps = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_APPS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const { userApps } = getState();
    const { apps } = userApps;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let { data } = await axios.get('/api/apps', config);
    data.sort((a, b) => a.index - b.index);

    let sortedApps = apps;
    data.forEach((app) => {
      sortedApps[listNameValuePairs[app.list]].push(app);
    });
    dispatch({ type: USER_APPS_SUCCESS, payload: sortedApps });
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

    let list = listNameValuePairs[application.list];

    let appsCopy = apps;

    appsCopy[list].forEach((app) => {
      app.index++;
    });
    appsCopy[list].sort((a, b) => a.index - b.index);
    appsCopy[list].unshift(data);

    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
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

export const deleteAppById = (app) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const {
    userApps: { apps },
  } = getState();
  const { id, list, index } = app;

  let config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  let data = { ...config, data: { id, index, list } };

  let appsCopy = apps;
  let listName = listNameValuePairs[list];
  let appsArr = appsCopy[listName];
  console.log(listName);
  appsArr.forEach((app) => {
    if (app.index > index) app.index -= 1;
  });
  appsArr = appsArr.filter((app) => app.id !== id);
  appsCopy[listName] = appsArr;
  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });

  await axios.delete('/api/apps', data);
};
