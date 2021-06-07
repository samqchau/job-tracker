import React from 'react';
import '../styles/appCard.css';

const AppCard = ({ app }) => {
  const { company_name, job_title, favorited, color } = app;
  return (
    <div className='app-card' style={{ backgroundColor: color }}>
      <div className='app-card-body'>
        <div className='app-card-body-left'>
          <span>{job_title}</span>
          <span>{company_name}</span>
        </div>
        <div className='app-card-body-right'>
          <i className={`${favorited ? 'fas' : 'far'} fa-star`} />
        </div>
      </div>
      <div className='app-card-footer'></div>
    </div>
  );
};

export default AppCard;
