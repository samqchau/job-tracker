import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import '../../styles/newAppModal.css';
import { colorsArr } from '../../styles/colorPallet';
import { addAppToList } from '../../actions/appActions';
import ColorSelect from '../ColorSelect';

const listValues = [
  'Wishlist',
  'Applied',
  'Phone',
  'On Site',
  'Offer',
  'Rejected',
];

const NewAppModal = ({ show, handleClose, listValue }) => {
  const dispatch = useDispatch();

  let today = new Date(Date());
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [list, setList] = useState(listValue);
  const [date, setDate] = useState(`${yyyy}-${mm}-${dd}`);
  const [url, setUrl] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    let application = {
      companyName,
      jobTitle,
      list,
      date,
      url,
      salary,
      location,
      color,
      description,
    };

    dispatch(addAppToList(application));
  };

  const changeColorTo = (color) => {
    setColor(color);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='md'
      className='newAppModal'
      contentClassName='newAppCustomModal'
    >
      <Modal.Header>
        <Modal.Title>Track a new application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form as={Row}>
          <Form.Group as={Col} controlId='companyName' xs={12} sm={6}>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
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
              placeholder='Enter Job Title'
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='list' as={Col} xs={12} sm={6}>
            <Form.Label>List</Form.Label>
            <Form.Control
              as='select'
              value={list}
              onChange={(e) => {
                setList(e.target.value);
              }}
            >
              {listValues.map((item, i) => (
                <option value={i + 1} key={i + 1}>
                  {listValues[i]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='dateApplied' as={Col} xs={12} sm={6}>
            <Form.Label>Date Applied</Form.Label>
            <Form.Control
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='url' as={Col} xs={12} sm={6}>
            <Form.Label>URL</Form.Label>
            <Form.Control
              placeholder='+  Add URL'
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='salary' as={Col} xs={12} sm={6}>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              placeholder='Salary'
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='location' as={Col} xs={12} sm={6}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              placeholder='Location'
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='color' as={Col} xs={12} sm={6}>
            <Form.Label>Color</Form.Label>
            <ColorSelect color={color} setColor={changeColorTo} />
          </Form.Group>

          <Form.Group controlId='description' as={Col} xs={12}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder='Job Description'
              value={description}
              as='textarea'
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='dark' onClick={handleClose}>
          Close
        </Button>
        <Button onClick={submitHandler} variant='success'>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewAppModal;
