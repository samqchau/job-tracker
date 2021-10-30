import axios from 'axios';
import {
  USER_APPS_REQUEST,
  USER_APPS_SUCCESS,
  USER_APPS_FAIL,
  POST_APP_REQUEST,
  POST_APP_SUCCESS,
  POST_APP_FAIL,
  UPDATE_APP_REQUEST,
  UPDATE_APP_SUCCESS,
  UPDATE_APP_FAIL,
  UPDATE_APP_RESET,
  APP_TOOL_TIP_ON,
  APP_TOOL_TIP_OFF,
} from '../constants/appConstants';
import listNameValuePairs from '../data/lookUpTables/listNameValuePairs';
import { noApps } from '../helpers/noApps';

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
    dispatch(toggleTooltip());
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
    data.notes = [];
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
    dispatch(toggleTooltip());
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
  const { id, list, index, fav_index, favorited } = app;

  let config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      'Content-Type': 'application/json',
    },
  };

  let data = { ...config, data: { id, index, list, fav_index, favorited } };

  let appsCopy = apps;

  for (let key in appsCopy) {
    appsCopy[key].forEach((app) => {
      if (app.fav_index > fav_index) {
        app.fav_index -= 1;
      }
    });
  }

  let listName = listNameValuePairs[list];
  let appsArr = appsCopy[listName];

  appsArr.forEach((app) => {
    if (app.index > index) app.index -= 1;
  });

  appsArr = appsArr.filter((app) => app.id !== id);
  appsCopy[listName] = appsArr;
  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
  dispatch(toggleTooltip());
  await axios.delete('/api/apps', data);
};

export const updateAppById = (app) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_APP_REQUEST });
    let {
      userLogin: { userInfo },
    } = getState();

    let {
      userApps: { apps },
    } = getState();
    let list = listNameValuePairs[app.list];
    let appsCopy = apps;
    let arr = apps[list];
    arr[arr.indexOf((e) => (e.id = app.id))] = app;
    appsCopy[list] = arr;

    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
    await axios.put('/api/apps', app, config);
    dispatch({ type: UPDATE_APP_SUCCESS });
    setTimeout(() => {
      dispatch({ type: UPDATE_APP_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_APP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const favoriteAppById = (app) => async (dispatch, getState) => {
  let {
    userLogin: { userInfo },
  } = getState();

  let {
    userApps: { apps },
  } = getState();

  if (app.favorited) {
    for (let key in apps) {
      apps[key].forEach((e) => {
        if (e.fav_index >= 0) {
          e.fav_index += 1;
        }
      });
    }
    app.fav_index = 0;
  } else {
    for (let key in apps) {
      apps[key].forEach((e) => {
        if (e.fav_index > app.fav_index) {
          e.fav_index -= 1;
        }
      });
    }
    app.fav_index = null;
  }

  let list = listNameValuePairs[app.list];
  let appsCopy = apps;
  let arr = apps[list];
  arr[arr.indexOf((e) => (e.id = app.id))] = app;
  appsCopy[list] = arr;

  let config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
  await axios.put('/api/apps/update/fav', app, config);
  await axios.put('/api/apps', app, config);
};

export const toggleTooltip = () => async (dispatch, getState) => {
  let {
    userApps: { apps },
  } = getState();
  if (noApps(apps)) dispatch({ type: APP_TOOL_TIP_ON });
  else dispatch({ type: APP_TOOL_TIP_OFF });
};
