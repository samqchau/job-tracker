import React, { useState } from 'react';
import {
  Form,
  Col,
  Modal,
  Button,
  Row,
  Container,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/userActions';
import Message from '../Message';

const RegisterModal = ({ show, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error: responseError, success } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUser);
    setPasswordError(false);
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    /*
-need to dispatch login function with registered user data from userActions registerUser
-Get updated registerUser redux state to add success and failure messages
*/
    let user = {
      firstName,
      familyName,
      email,
      username,
      password,
    };
    dispatch(registerUser(user));
  };

  return (
    <Modal show={show} onHide={handleClose} centered size='md'>
      <Modal.Header>
        <Modal.Title>Register to save your data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {responseError && <Message variant='danger'>{responseError}</Message>}
        {success && (
          <Message variant='success'>You have successfully registered!</Message>
        )}
        <Form as={Row}>
          <Form.Group
            className='pb-2'
            as={Col}
            controlId='firstName'
            xs={12}
            sm={6}
          >
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

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='familyName'
            xs={12}
            sm={6}
          >
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

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='email'
            xs={12}
            sm={6}
          >
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
          <Form.Group
            className='pb-2'
            as={Col}
            controlId='username'
            xs={12}
            sm={6}
          >
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

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='password'
            xs={12}
            sm={6}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              required
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            className='pb-2'
            as={Col}
            controlId='confirmPassword'
            xs={12}
            sm={6}
          >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
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
      {passwordError && (
        <Message variant='danger'>
          Please make sure your passwords match
        </Message>
      )}
      <Modal.Footer>
        <Container
          className='d-flex'
          fluid
          style={{ justifyContent: 'space-evenly' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {loading ? (
              <>
                <Spinner variant='dark' animation='grow' />
                <Spinner variant='dark' animation='grow' />
                <Spinner variant='dark' animation='grow' />
              </>
            ) : (
              'Already have an account?'
            )}
          </div>
          <div>
            {' '}
            <Button size='md' className='mx-1'>
              Login
            </Button>
            <Button onClick={submitHandler}>Register</Button>
          </div>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
