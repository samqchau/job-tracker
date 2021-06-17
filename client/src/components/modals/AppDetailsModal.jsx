import React, { useState, useEffect } from 'react';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import NotesModal from '../NotesModal';
import DetailModal from '../DetailModal';
import '../../styles/appDetailsModal.css';

const AppDetailsModal = ({ app, show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='xl'
      className='detailModal'
    >
      <Route
        path='/home/details'
        render={(props) => (
          <DetailModal {...props} app={app} handleClose={handleClose} />
        )}
      />
      <Route
        path='/home/notes'
        render={(props) => (
          <NotesModal {...props} app={app} handleClose={handleClose} />
        )}
      />
    </Modal>
  );
};

export default AppDetailsModal;
