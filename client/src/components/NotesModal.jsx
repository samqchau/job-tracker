import React, { useState } from 'react';
import { Modal, Row, Button } from 'react-bootstrap';
import ListSelect from './ListSelect';
import FavoriteButton from './FavoriteButton';
import { Link } from 'react-router-dom';
import '../styles/notesModal.css';
import DetailModalNav from './DetailModalNav';

const NotesModal = ({ app, handleClose }) => {
  const [showListSelect, setShowListSelect] = useState(false);

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
      <Modal.Body
        as={Row}
        className='notesModal-body detailModal-body'
      ></Modal.Body>
    </>
  );
};

export default NotesModal;
