import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/appList.css';
import AppCard from './AppCard';
import { Droppable } from 'react-beautiful-dnd';

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
        <Droppable droppableId={name}>
          {(provided) => (
            <div
              className='list-body-main'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {apps &&
                apps
                  .filter((app) => app.list === nameValue)
                  .map((app, index) => (
                    <AppCard app={app} key={app.id} index={index} />
                  ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default AppList;
