import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/deleteModal.css';

const DeleteAppModal = ({ show, handleClose, deleteHandler }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='md'
      className='deleteModal'
    >
      <Modal.Body className='deleteModal-body'>
        <h4>Delete Job</h4>
        <p>Are you sure you want to delete this job?</p>
        <div className='deleteModal-body-button-container'>
          <Button className='deleteModal-delete-button' onClick={deleteHandler}>
            Delete
          </Button>
          <Button className='deleteModal-cancel-button' onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAppModal;
