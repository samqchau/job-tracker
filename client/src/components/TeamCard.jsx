import React from 'react';
import '../styles/teamCard.css';

const TeamCard = () => {
  return (
    <div className='team-card landing-section-content'>
      <div className='team-card-left'>
        <img
          className='team-card-left-picture'
          alt='Samuel Chau'
          src='/pngs/jobtracker-profile-1.jpg'
        />
      </div>
      <div className='team-card-right'>
        <p>Let's work together</p>
        <div className='team-card-socials-container'>
          <div className='footer-content-right'>
            <i className='footer-social-icon fab fa-instagram fa-lg'></i>
            <i className='footer-social-icon fab fa-facebook-square fa-lg'></i>
            <i className='footer-social-icon fab fa-twitter fa-lg'></i>
          </div>
        </div>
        <a
          href='https://www.yahoo.com'
          target='_blank'
          rel='noreferrer'
          className='portfolio-container'
        >
          <div className='portfolio-link'>www.samqchau.com</div>
          <div className='external-link'></div>
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
