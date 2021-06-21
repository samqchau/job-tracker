import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import RegisterModal from './modals/RegisterModal';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import OpenFavorites from './OpenFavorites';
import '../styles/header.css';
import Logo from './Logo';

const Header = () => {
  const [showRegister, setShowRegister] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { error: loginError, userInfo } = userLogin;

  const closeRegisterModal = () => {
    setShowRegister(false);
  };
  const showRegisterModal = () => setShowRegister(true);

  return (
    <Container fluid className='header-background'>
      <Container className='header-container' fluid>
        <div className='header-left'>
          <Logo />
          <span className='header-logo-text'>JobTrackr</span>
        </div>
        <div className='header-center'></div>
        <div className='header-right'>
          {userInfo && <OpenFavorites />}
          {userInfo && (
            <div className='header-icon' title='Profile'>
              <i className='fas fa-user-edit'></i>
            </div>
          )}

          <LogoutButton />
        </div>

        <RegisterModal show={showRegister} handleClose={closeRegisterModal} />
      </Container>
    </Container>
  );
};

export default Header;
