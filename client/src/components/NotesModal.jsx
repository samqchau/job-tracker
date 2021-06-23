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
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Message from './Message';

const NotesModal = ({ app, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;
  const [errorMessage, setErrorMessage] = useState('Save a new note');

  const [showListSelect, setShowListSelect] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const notesModalBodyRef = useRef();

  const url = `/app_notes/${app.id}`;

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
      if (app.notes.length === 0) {
        history.push(`/app_notes/${app.id}/create`);
      }
    };

    fetchNotesByAppId();
  }, [id, userInfo.token, apps, list, dispatch, history, app]);

  useEffect(() => {
    if (app.notes) {
      if (app.notes.length === 0) {
        history.push(`/app_notes/${app.id}/create`);
      }
    }
  }, [app.notes, history, app.id]);

  const openListSelect = () => {
    setShowListSelect(true);
  };

  const closeListSelect = () => {
    setShowListSelect(false);
  };

  const handleCloseButtonClick = () => {
    handleClose();
  };

  const handleSaveClick = () => {
    if (noteContent.trim()) {
      dispatch(saveNote(app, noteContent));
      setNoteContent('');
      history.push(`/app_notes/${app.id}`);
    } else {
      setErrorMessage("Notes can't be empty");
    }
  };

  return (
    <>
      <Modal.Header
        className={`detailModal-header ${app.color ? app.color : 'white'}`}
        onClick={(e) => {
          e.stopPropagation();
          closeListSelect();
          if (app.notes && app.notes.length) {
            history.push(url);
          }
          setErrorMessage('');
        }}
      >
        <Row className='detailModal-header-nav'>
          <div className='detailModal-header-nav-buttonContainer'>
            <div className='detailModal-moveButton-container'>
              <Button
                className='modal-button detail-modal-moveButton'
                onClick={(e) => {
                  e.stopPropagation();
                  openListSelect();
                }}
              >
                Move
              </Button>
              {showListSelect && (
                <ListSelect close={closeListSelect} app={app} />
              )}
            </div>
            <Button
              className='modal-button detail-modal-closeButton'
              onClick={(e) => {
                e.stopPropagation();
                handleCloseButtonClick();
              }}
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
            <FavoriteButton app={app} color={app.color} />
          </div>
          <DetailModalNav app={app} />
        </Row>
      </Modal.Header>
      <Modal.Body
        className={`notesModal-body detailModal-body ${
          app.color ? app.color : 'white'
        }-body`}
        ref={notesModalBodyRef}
        onClick={() => {
          closeListSelect();
          if (app.notes && app.notes.length) {
            history.push(url);
          }
          setErrorMessage('');
        }}
      >
        <div className='notesModal-body-container'>
          <Route
            path={`/app_notes/${app.id}/create`}
            render={(props) => (
              <>
                {' '}
                <div
                  className='notesModal-body-button-container'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {errorMessage && (
                    <Message
                      variant='info'
                      style={{
                        margin: '0px',
                        padding: '0px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: '3px',
                        paddingLeft: '23px',
                        borderRadius: '10px 10px 0 0',
                      }}
                    >
                      {errorMessage}
                    </Message>
                  )}
                  <div
                    className='notesModal-body-create-container'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveClick();
                    }}
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
                      if (app.notes) {
                        if (app.notes.length) {
                          history.push(`/app_notes/${app.id}`);
                        } else {
                          setErrorMessage('Create your first note to display');
                        }
                      }
                    }}
                  >
                    <div className='notesModal-body-create-right' title='Close'>
                      <i className='fas fa-times notesModal-body-close-icon'></i>
                      <span className='notesModal-body-create-text'>Close</span>
                    </div>
                  </div>
                </div>
                <Form
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      as='textarea'
                      placeholder='Save your notes here'
                      value={noteContent}
                      onChange={(e) => {
                        setNoteContent(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </>
            )}
          />
          {app.notes &&
            app.notes.map((note, i) => (
              <AppNote note={note} key={i} app={app} />
            ))}
        </div>
      </Modal.Body>
      <Route
        path={`/app_notes/${app.id}`}
        render={(props) => (
          <div className='notesModal-open-form-button'>
            <div
              className='notesModal-body-create-right square-corner'
              title='Create a note'
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/app_notes/${app.id}/create`);
                notesModalBodyRef.current.scroll({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            >
              <i className='fas fa-plus notesModal-body-create-icon'></i>
              <span className='notesModal-body-create-text'>Note</span>
            </div>
          </div>
        )}
        exact
      />
    </>
  );
};

export default NotesModal;
