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
            <a
              href='https://instagram.com/chau_now/'
              target='_blank'
              rel='noreferrer'
            >
              <i className='footer-social-icon fab fa-instagram fa-lg'></i>
            </a>
            <a
              href='https://facebook.com/samuel.chau1'
              target='_blank'
              rel='noreferrer'
            >
              <i className='footer-social-icon fab fa-facebook-square fa-lg'></i>
            </a>
            <a
              href='https://twitter.com/samqchau'
              target='_blank'
              rel='noreferrer'
            >
              <i className='footer-social-icon fab fa-twitter fa-lg'></i>
            </a>
          </div>
        </div>
        <a
          href='https://samqchau.github.io/portfolio'
          target='_blank'
          rel='noreferrer'
          className='portfolio-container'
        >
          <div className='portfolio-link'>Visit My Portfolio</div>
          <div className='external-link'></div>
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
