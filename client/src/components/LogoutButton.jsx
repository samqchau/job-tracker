import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logoutUser } from '../actions/userActions';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    history.push('/info');
    dispatch(logoutUser());
  };
  return userInfo ? <Button onClick={logoutHandler}>Logout</Button> : null;
};

export default LogoutButton;
