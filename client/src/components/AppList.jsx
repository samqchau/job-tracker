import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/appList.css';
import AppCard from './AppCard';
import { Droppable } from 'react-beautiful-dnd';
import NewAppModal from './modals/NewAppModal';

const AppList = ({ name, icon, nameValue }) => {
  const [showModal, setShowModal] = useState(false);

  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  const handleClose = () => {
    setShowModal(false);
  };

  const showAppModal = () => {
    setShowModal(true);
  };

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
        <div className='list-add' onClick={showAppModal}>
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
      <NewAppModal
        show={showModal}
        handleClose={handleClose}
        listValue={nameValue}
      />
    </>
  );
};

export default AppList;
