import React, { useState } from 'react';
import { Form, Col, Modal, Button, Row } from 'react-bootstrap';

const RegisterModal = ({ show, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size='md'>
      <Modal.Header>
        <Modal.Title>Make an account to save your data!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form as={Row}>
          <Form.Group as={Col} controlId='firstName' xs={12} sm={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              placeholder='First Name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='familyName' xs={12} sm={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              placeholder='Last Name'
              value={familyName}
              onChange={(e) => {
                setFamilyName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='email' xs={12} sm={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId='username' xs={12} sm={6}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              placeholder='Select a username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='password' xs={12} sm={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId='confirmPassword' xs={12} sm={6}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        Already have an account? Register
        <Button onClick={submitHandler}>Register</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
