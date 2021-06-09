import React from 'react';
import { useDispatch } from 'react-redux';
import '../styles/appCard.css';
import '../styles/colorPalette.css';
import { Draggable } from 'react-beautiful-dnd';

import { deleteAppById } from '../actions/appActions';

const AppCard = ({ app }) => {
  const dispatch = useDispatch();
  const { company_name, job_title, favorited, id, color, index, list } = app;

  const deleteHandler = (e) => {
    dispatch(deleteAppById(app));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={`app-card ${color ? color : 'white'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='app-card-body'>
            <div className='app-card-body-left'>
              <span>{job_title}</span>
              <span>{company_name}</span>
            </div>
            <div className='app-card-body-right'>
              <i className={`${favorited ? 'fas' : 'far'} fa-star`} />
              <i className='far fa-trash-alt' onClick={deleteHandler}></i>
            </div>
          </div>
          <div className='app-card-footer'>{index}</div>
        </div>
      )}
    </Draggable>
  );
};

export default AppCard;
