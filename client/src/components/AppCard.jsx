import React from 'react';
import '../styles/appCard.css';
import '../styles/colorPalette.css';
import { Draggable } from 'react-beautiful-dnd';

const AppCard = ({ app, index }) => {
  const { company_name, job_title, favorited, id, color } = app;
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
            </div>
          </div>
          <div className='app-card-footer'></div>
        </div>
      )}
    </Draggable>
  );
};

export default AppCard;
