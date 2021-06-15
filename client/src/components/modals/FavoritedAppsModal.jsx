import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import AppCard from '../AppCard';
import FavoritedDragDropContext from '../FavoritedDragDropContext.jsx';
import '../../styles/favoritedAppsModal.css';

const FavoritedAppsModal = ({ show, onHide }) => {
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;
  let favoritedApps = [];
  for (let list in apps) {
    favoritedApps = [...favoritedApps, ...apps[list]];
  }
  favoritedApps = favoritedApps.filter((app) => app.favorited === true);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size='xl'
      className='favoritesModal'
      onClick={() => {}}
    >
      <Modal.Body className='favoritesModal-body'>
        <div className='list-container'>
          <div className='list-header'>
            <span className='list-header-icon'>
              <i className='far fa-star' />
            </span>
            <div className='list-header-main'>
              <div className='list-header-main-title'>Favorited</div>
              <div className='list-header-main-count'>
                {favoritedApps.length === 0 ? 0 : favoritedApps.length} jobs
              </div>
            </div>
          </div>
          <FavoritedDragDropContext>
            <Droppable droppableId='favorited'>
              {(provided) => (
                <div
                  className='list-body-main'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {favoritedApps &&
                    favoritedApps.map((app, index) => (
                      <AppCard app={app} key={app.id} index={index} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </FavoritedDragDropContext>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FavoritedAppsModal;
