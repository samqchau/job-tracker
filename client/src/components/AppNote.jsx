import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../styles/note.css';
import { trimDate, formatDate } from '../helpers/dateHelpers';
import DeleteAppModal from './modals/DeleteAppModal';
import { deleteNoteById } from '../actions/noteActions';
import { useDispatch } from 'react-redux';
import { useHistory, Route, useLocation } from 'react-router-dom';

const AppNote = ({ note, app }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  let noteId = location.pathname.split('/')[4];
  const [content, setContent] = useState(note.content);
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
      <div
        className='note'
        onClick={(e) => {
          if (noteId === note.id) {
            e.stopPropagation();
          }
        }}
      >
        <div className='note-header'>
          <div className='note-header-date'>
            {formatDate(trimDate(note.created_on))}
          </div>
          <div className='note-header-border'></div>
          <div className='note-header-buttons'>
            <i
              className={`${
                noteId === note.id ? 'fas fa-times' : 'far fa-edit'
              }`}
              title={`${noteId === note.id ? 'Close' : 'Edit'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (noteId === note.id) {
                  history.push(`/app_notes/${app.id}`);
                } else {
                  history.push(`/app_notes/${app.id}/edit/${note.id}`);
                }
              }}
            />
            <i
              className='far fa-trash-alt'
              title='Delete'
              onClick={() => {
                openDeleteModal();
              }}
            ></i>
          </div>
        </div>
        <div className='note-body'>
          {noteId !== note.id && (
            <div className='note-body-content'>{note.content}</div>
          )}
          <Route
            render={(props) =>
              note.id === location.pathname.split('/')[4] && (
                <Form>
                  <Form.Control
                    as='textarea'
                    className='noteupdate-textarea'
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    placeholder='Update note...'
                  ></Form.Control>
                  <div className='noteupdateform-update-button'>
                    <Button
                      className='modal-button detail-modal-updateButton'
                      style={{ marginRight: '5px' }}
                      onClick={() => {}}
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              )
            }
            path={'/app_notes/:id/edit/:noteId'}
          />
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
