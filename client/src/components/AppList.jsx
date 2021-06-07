import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/appList.css';
import AppCard from './AppCard';

const AppList = ({ name, icon, nameValue }) => {
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  return (
    <>
      <div className='list-container'>
        <div className='list-header'>
          <span className='list-header-icon'>
            <i className={icon}></i>
          </span>
          <div className='list-header-main'>
            <div className='list-header-main-title'>{name}</div>
            <div className='list-header-main-count'>
              {apps && apps.filter((app) => app.list === nameValue).length > 0
                ? apps.filter((app) => app.list === nameValue).length
                : 0}{' '}
              jobs
            </div>
          </div>
          <span className='list-header-options'>
            <i className='fas fa-ellipsis-v' />
          </span>
        </div>
        <div className='list-add'>
          <i className='fas fa-plus' />
        </div>
        <div className='list-body-main'>
          {apps &&
            apps
              .filter((app) => app.list === nameValue)
              .map((app) => <AppCard app={app} key={app.id} />)}
        </div>
      </div>
    </>
  );
};

export default AppList;
