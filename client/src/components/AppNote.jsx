import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/note.css';
import { trimDate, formatDate } from '../helpers/dateHelpers';
import DeleteAppModal from './modals/DeleteAppModal';
import { deleteNoteById } from '../actions/noteActions';
import { useDispatch } from 'react-redux';

const AppNote = ({ note, app }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const deleteHandler = () => {
    dispatch(deleteNoteById(app, note.id));
    closeDeleteModal();
  };

  return (
    <>
      <div className='note'>
        <div className='note-header'>
          <div className='note-header-date'>
            {formatDate(trimDate(note.created_on))}
          </div>
          <div className='note-header-border'></div>
          <div className='note-header-buttons'>
            <i className='far fa-edit' title='Edit' />
            <i
              className='far fa-trash-alt'
              title='Delete'
              onClick={openDeleteModal}
            ></i>
          </div>
        </div>
        <div className='note-body'>
          <div className='note-body-content'>{note.content}</div>
        </div>
      </div>
      <DeleteAppModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        deleteHandler={deleteHandler}
        item='note'
      />
    </>
  );
};

export default AppNote;
