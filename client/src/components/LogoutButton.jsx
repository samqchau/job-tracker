import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logoutUser } from '../actions/userActions';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return userInfo ? <Button onClick={logoutHandler}>Logout</Button> : null;
};

export default LogoutButton;
