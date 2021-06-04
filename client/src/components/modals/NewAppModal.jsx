import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const NewAppModal = ({ show, handleClose }) => {
  let today = new Date(Date());
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState(3);
  const [date, setDate] = useState(`${yyyy}-${mm}-${dd}`);

  const statusArr = [
    'Pending',
    'In Progress',
    'Declined',
    'Rejected',
    'Accepted',
    'Offer',
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log('submitted');
    let application = {
      companyName,
      jobTitle,
      status,
    };
    let config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(status);
    let { data } = await axios.post('/api/apps', application, config);
    console.log(data);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size='md'>
      <Modal.Header>
        <Modal.Title>Track a new application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler} as={Row}>
          <Form.Group as={Col} controlId='companyName' xs={12} sm={6}>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              required
              placeholder='Company Name'
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='jobTitle' as={Col} xs={12} sm={6}>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              required
              placeholder='Enter Job Title'
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='status' as={Col} xs={12} sm={6}>
            <Form.Label>Status of Application</Form.Label>
            <Form.Control
              required
              as='select'
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              {statusArr.map((item, i) => (
                <option value={i + 1} key={i + 1}>
                  {statusArr[i]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='status' as={Col} xs={12} sm={6}>
            <Form.Label>Date Applied</Form.Label>
            <Form.Control
              required
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button onClick={submitHandler}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAppModal;
