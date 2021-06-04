import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import RegisterModal from './modals/RegisterModal';
import { USER_REGISTER_RESET } from '../constants/userConstants';

const Header = () => {
  const [showRegister, setShowRegister] = useState(false);

  const dispatch = useDispatch();

  const closeRegisterModal = () => {
    setShowRegister(false);
    dispatch({ type: USER_REGISTER_RESET });
  };
  const showRegisterModal = () => setShowRegister(true);

  return (
    <>
      <div>Welcome back username</div>
      <Button onClick={showRegisterModal}>Register</Button>
      <RegisterModal show={showRegister} handleClose={closeRegisterModal} />
    </>
  );
};

export default Header;
