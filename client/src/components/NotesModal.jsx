import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Button, Form } from 'react-bootstrap';
import ListSelect from './ListSelect';
import FavoriteButton from './FavoriteButton';
import '../styles/notesModal.css';
import DetailModalNav from './DetailModalNav';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import nameValuePairs from '../data/lookUpTables/listNameValuePairs';
import { USER_APPS_SUCCESS } from '../constants/appConstants';
import AppNote from './AppNote';
import { saveNote } from '../actions/noteActions';
import { POST_NOTE_RESET } from '../constants/noteConstants';

const NotesModal = ({ app, handleClose }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;
  const notePost = useSelector((state) => state.notePost);
  const { loading, error, success } = notePost;

  const [showListSelect, setShowListSelect] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const notesModalBodyRef = useRef();

  const { id, list } = app;
  useEffect(() => {
    const fetchNotesByAppId = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      let { data } = await axios.get(`/api/apps/notes/${id}`, config);
      let appsCopy = apps;
      let listName = nameValuePairs[list];
      let arr = appsCopy[listName];
      let updatedApp = arr.filter((e) => e.id === id)[0];
      updatedApp.notes = data;
      let idx = arr.findIndex((e) => e.id === id);
      arr[idx] = updatedApp;
      appsCopy[listName] = arr;
      dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });
    };

    fetchNotesByAppId();
  }, [id, userInfo.token, apps, list, dispatch]);

  const openListSelect = (e) => {
    e.stopPropagation();
    setShowListSelect(true);
  };

  const closeListSelect = (e) => {
    e.stopPropagation();
    setShowListSelect(false);
  };

  const openNoteForm = () => {
    setShowNoteForm(true);
  };

  const closeNoteForm = () => {
    setShowNoteForm(false);
  };

  const handleCloseButtonClick = (e) => {
    handleClose();
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (noteContent.trim()) {
      dispatch(saveNote(app, noteContent));
      setNoteContent('');
      closeNoteForm();
    }
  };

  return (
    <>
      <Modal.Header className='detailModal-header' onClick={closeListSelect}>
        <Row className='detailModal-header-nav'>
          <div className='detailModal-header-nav-buttonContainer'>
            <div className='detailModal-moveButton-container'>
              <Button
                className='modal-button detail-modal-moveButton'
                onClick={openListSelect}
              >
                Move
              </Button>
              {showListSelect && (
                <ListSelect close={closeListSelect} app={app} />
              )}
            </div>
            <Button
              className='modal-button detail-modal-closeButton'
              onClick={handleCloseButtonClick}
            >
              Close
            </Button>
          </div>
          <div className='detailModal-header-main'>
            <div className='detailModal-header-main-text'>
              <p className='detailModal-header-main-text-company'>
                {app.company_name}
              </p>
              <p className='detailModal-header-main-text-job'>
                {app.job_title}
              </p>
            </div>
            <FavoriteButton app={app} />
          </div>
          <DetailModalNav app={app} />
        </Row>
      </Modal.Header>
      <Modal.Body
        className='notesModal-body detailModal-body'
        ref={notesModalBodyRef}
        onClick={closeListSelect}
      >
        <div className='notesModal-body-container'>
          {showNoteForm && (
            <>
              {' '}
              <div className='notesModal-body-button-container'>
                <span
                  style={{
                    marginRight: 'auto',
                  }}
                >
                  Save a new note
                </span>
                <div
                  className='notesModal-body-create-container'
                  onClick={handleSaveClick}
                >
                  <div className='notesModal-body-create-right' title='Save'>
                    <i className='fas fa-plus notesModal-body-create-icon'></i>
                    <span className='notesModal-body-create-text'>Save</span>
                  </div>
                </div>
                <div
                  className='notesModal-body-create-container'
                  onClick={(e) => {
                    e.stopPropagation();
                    closeNoteForm();
                  }}
                >
                  <div className='notesModal-body-create-right' title='Close'>
                    <i className='fas fa-times notesModal-body-close-icon'></i>
                    <span className='notesModal-body-create-text'>Close</span>
                  </div>
                </div>
              </div>
              <Form>
                <Form.Group>
                  <Form.Control
                    as='textarea'
                    placeholder='Save your notes here!'
                    value={noteContent}
                    onChange={(e) => {
                      setNoteContent(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </>
          )}

          {app.notes &&
            app.notes.map((note, i) => <AppNote note={note} key={i} />)}
        </div>
      </Modal.Body>
      {!showNoteForm && (
        <div className='notesModal-open-form-button'>
          <div
            className='notesModal-body-create-right square-corner'
            title='Create a note'
            onClick={(e) => {
              e.stopPropagation();
              openNoteForm();
              notesModalBodyRef.current.scroll({ top: 0, behavior: 'smooth' });
            }}
          >
            <i className='fas fa-plus notesModal-body-create-icon'></i>
            <span className='notesModal-body-create-text'>Note</span>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesModal;
