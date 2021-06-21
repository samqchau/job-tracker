import React from 'react';
import Logo from '../components/Logo';

const LoginCard = () => {
  return (
    <div className='landing-main-center-card'>
      <div className='landing-main-center-logo-container'>
        <div className='landing-main-center-logo'>
          <Logo />
          <div className='landing-main-center-logo-text'>JobTrackr</div>
        </div>
      </div>
      <div className='landing-main-center-body-text'>
        Keep Track of your Job Search & Organize your Applications
      </div>
      <div className='landing-main-center-login-container'>
        <div className='landing-main-center-title'>Login With </div>
        <div className='landing-main-center-icon-container'>
          <div className='header-icon landing-center-card-icon' title='Gmail'>
            <img
              className='landing-center-card-png'
              src='/pngs/gmail_64.png'
              alt='Gmail'
            />
          </div>
          <div
            className='header-icon landing-center-card-icon'
            title='Facebook'
          >
            <img
              className='landing-center-card-png fb-icon'
              src='/pngs/fb_64.png'
              alt='Facebook'
            />
          </div>
          <div className='header-icon landing-center-card-icon' title='Github'>
            <img
              className='landing-center-card-png gh-icon'
              src='/pngs/gh_64.png'
              alt='Github'
            />
          </div>
        </div>
      </div>
      <div className='landing-center-card-footer'>Developed by Samuel Chau</div>
    </div>
  );
};

export default LoginCard;
