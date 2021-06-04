import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import RegisterModal from './modals/RegisterModal';

const Header = () => {
  const [showRegister, setShowRegister] = useState(false);

  const closeRegisterModal = () => setShowRegister(false);
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
