import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/appList.css';

const AppList = ({ name, icon }) => {
  return (
    <>
      <div className='list-container'>
        <div className='list-header'>
          <span className='list-header-icon'>
            <i className={icon}></i>
          </span>
          <div className='list-header-main'>
            <div className='list-header-main-title'>{name}</div>
            <div className='list-header-main-count'>3 jobs</div>
          </div>
          <span className='list-header-options'>
            <i className='fas fa-ellipsis-v' />
          </span>
        </div>
        <div className='list-add'>
          <i className='fas fa-plus' />
        </div>
        <div className='list-cards-container'>Cards List</div>
      </div>
    </>
  );
};

export default AppList;
