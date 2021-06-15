import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/appCard.css';
import '../styles/colorPalette.css';
import { Draggable } from 'react-beautiful-dnd';
import { deleteAppById } from '../actions/appActions';

import DeleteAppModal from './modals/DeleteAppModal';
import AppDetailsModal from './modals/AppDetailsModal';
import FavoriteButton from './FavoriteButton';

const AppCard = ({ app, favslist, index }) => {
  const dispatch = useDispatch();
  const { company_name, job_title, id, color } = app;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsModalDisabled, setDetailsModalDisabled] = useState(false);

  const deleteHandler = (e) => {
    dispatch(deleteAppById(app));
    closeDeleteModal();
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const openDetailsModal = () => {
    if (!detailsModalDisabled) {
      setShowDetailsModal(true);
    }
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const disableDetailsModal = () => {
    setDetailsModalDisabled(true);
  };

  const enableDetailsModal = () => {
    setDetailsModalDisabled(false);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            className={`app-card ${color ? color : 'white'}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={openDetailsModal}
          >
            <div className='app-card-body'>
              <div className='app-card-body-left'>
                <span className='app-card-body-job'>{job_title}</span>
                <span className='app-card-body-company'>{company_name}</span>
              </div>
              <div
                className='app-card-body-right'
                onMouseOver={disableDetailsModal}
                onMouseLeave={enableDetailsModal}
              >
                <FavoriteButton app={app} />
                <i
                  className='far fa-trash-alt'
                  onClick={openDeleteModal}
                  title='Delete'
                ></i>
              </div>
            </div>
            <div className='app-card-footer'></div>
          </div>
        )}
      </Draggable>
      <DeleteAppModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        deleteHandler={deleteHandler}
      />
      <AppDetailsModal
        app={app}
        show={showDetailsModal}
        handleClose={closeDetailsModal}
      />
    </>
  );
};

export default AppCard;
