import React, { useState, useEffect } from 'react';
import { Modal, Row, Button } from 'react-bootstrap';
import ListSelect from './ListSelect';
import FavoriteButton from './FavoriteButton';
import '../styles/notesModal.css';
import DetailModalNav from './DetailModalNav';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import nameValuePairs from '../data/lookUpTables/listNameValuePairs';
import { USER_APPS_SUCCESS } from '../constants/appConstants';

const NotesModal = ({ app, handleClose }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;
  const [showListSelect, setShowListSelect] = useState(false);

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

  const openListSelect = () => {
    setShowListSelect(true);
  };

  const closeListSelect = () => {
    setShowListSelect(false);
  };

  const handleCloseButtonClick = (e) => {
    handleClose();
  };

  return (
    <>
      <Modal.Header className='detailModal-header'>
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
      <Modal.Body as={Row} className='notesModal-body detailModal-body'>
        {app.notes &&
          app.notes.map((note) => <div key={note.id}>{note.content}</div>)}
      </Modal.Body>
    </>
  );
};

export default NotesModal;
