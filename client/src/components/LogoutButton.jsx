import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logoutUser } from '../actions/userActions';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return <Button onClick={logoutHandler}>Logout</Button>;
};

export default LogoutButton;
