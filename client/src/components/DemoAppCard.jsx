import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import FavoriteButton from './FavoriteButton';

const DemoAppCard = ({ app, index, setApps }) => {
  const { id, job_title, company_name } = app;
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          className={`app-card white`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='app-card-body demo-app-card-body'>
            <div className='app-card-body-left'>
              <span className='app-card-body-job'>{job_title}</span>
              <span className='app-card-body-company'>{company_name}</span>
            </div>
            <div className='app-card-body-right'>
              <FavoriteButton
                app={app}
                color={app.color}
                demoButton={true}
                setApps={setApps}
              />
            </div>
          </div>
          <div className='app-card-footer'>
            <div className='app-card-footer-border'></div>
            <div className='app-card-footer-content'></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DemoAppCard;
