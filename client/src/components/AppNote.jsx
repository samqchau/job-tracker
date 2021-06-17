import React from 'react';
import { Col } from 'react-bootstrap';
import '../styles/note.css';
import { trimDate, formatDate } from '../helpers/dateHelpers';

const AppNote = ({ note }) => {
  return (
    <div className='note'>
      <div className='note-header'>
        <div className='note-header-date'>
          {formatDate(trimDate(note.created_on))}
        </div>
        <div className='note-header-border'></div>
        <div className='note-header-buttons'>
          <i className='far fa-edit' title='Edit' />
          <i className='far fa-trash-alt' title='Delete'></i>
        </div>
      </div>
      <div className='note-body'>
        <div className='note-body-content'>{note.content}</div>
      </div>
    </div>
  );
};

export default AppNote;
