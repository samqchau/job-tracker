import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
} from '../constants/userConstants';

export const registerUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let { data } = await axios.post('/api/users', user, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (emailAndPassword) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    let config = { headers: { 'Content-Type': 'application/json' } };
    let { data } = await axios.post(
      '/api/users/login',
      emailAndPassword,
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
