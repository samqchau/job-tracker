import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import RegisterModal from './modals/RegisterModal';
import { USER_REGISTER_RESET } from '../constants/userConstants';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

const Header = () => {
  const [showRegister, setShowRegister] = useState(false);

  const dispatch = useDispatch();

  const closeRegisterModal = () => {
    setShowRegister(false);
    dispatch({ type: USER_REGISTER_RESET });
  };
  const showRegisterModal = () => setShowRegister(true);

  return (
    <Container
      className='d-flex'
      style={{ justifyContent: 'space-evenly' }}
      fluid
    >
      <div>Welcome back username</div>
      <LoginForm />
      <LogoutButton />
      <Button onClick={showRegisterModal}>Register</Button>
      <RegisterModal show={showRegister} handleClose={closeRegisterModal} />
    </Container>
  );
};

export default Header;
