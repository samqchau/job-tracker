import React, { useState } from 'react';
import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import '../../styles/appDetailsModal.css';
import ColorSelect from '../ColorSelect';
import FavoriteButton from '../FavoriteButton';

const AppDetailsModal = ({ app, show, handleClose }) => {
  const [company, setCompany] = useState(app.company_name);
  const [jobTitle, setJobTitle] = useState(app.job_title);
  const [favorited, setFavorited] = useState(app.favorited);
  const [list, setList] = useState(app.list);
  const [url, setUrl] = useState(app.url);
  const [color, setColor] = useState(app.color);
  const [salary, setSalary] = useState(app.salary);
  const [location, setLocation] = useState(app.location);
  const [description, setDescription] = useState(app.description);

  const [deadline, setDeadline] = useState(app.deadline);
  const [applicationDate, setApplicationDate] = useState(app.application);
  const [interviewDate, setInterviewDate] = useState(app.interview);
  const [offerDate, setOfferDate] = useState(app.offer);
  const [offerAcceptanceDate, setOfferAcceptanceDate] = useState(
    app.offer_acceptance
  );

  const [showColorSelect, setShowColorSelect] = useState(false);

  const handleUpdateButtonClick = (e) => {};

  const handleMoveButtonClick = (e) => {};

  const handleCloseButtonClick = (e) => {
    handleClose();
  };

  const changeColorTo = (color) => {
    setColor(color);
  };

  const openColorSelect = () => {
    setShowColorSelect(true);
  };

  const closeColorSelect = () => {
    setShowColorSelect(false);
  };

  const toggleFavorited = () => {
    setFavorited((favorited) => !favorited);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size='xl'
      className='detailModal'
      onClick={() => {
        if (showColorSelect) {
          closeColorSelect();
        }
      }}
    >
      <Modal.Header className='detailModal-header'>
        <Row className='detailModal-header-nav'>
          <div className='detailModal-header-nav-buttonContainer'>
            <Button
              className='modal-button detail-modal-moveButton'
              onClick={handleMoveButtonClick}
            >
              Move
            </Button>
            <Button
              className='modal-button detail-modal-updateButton'
              onClick={handleUpdateButtonClick}
            >
              Update
            </Button>
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
        </Row>
      </Modal.Header>
      <Modal.Body className='detailModal-body' as={Row}>
        <Col xs={12} sm={12} md={8} className='detailModal-body-left' as={Row}>
          <Form.Group as={Col} xs={12} sm={6} md={6} lg={6}>
            <Form.Label>Company</Form.Label>
            <Form.Control
              value={company}
              placeholder='+ Company Name'
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={6} lg={6}>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              placeholder='+ Job Title'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={8}>
            <Form.Label>URL</Form.Label>
            <Form.Control
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              placeholder='+ Enter URL'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={4}>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              value={salary ? salary : ''}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              placeholder='+ Salary'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={8}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              placeholder='+ Location'
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6} md={4}>
            <Form.Label>Color</Form.Label>
            <ColorSelect
              color={color}
              setColor={changeColorTo}
              show={showColorSelect}
              openColorSelect={openColorSelect}
              closeColorSelect={closeColorSelect}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder='+ Description...'
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={4} className='detailModal-body-right'>
          <Row className='detailModal-body-right-content'>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Deadline</span>
                <span
                  className='detailModal-date-clear'
                  onClick={(e) => {
                    setDeadline('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={deadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Application</span>
                <span
                  className='detailModal-date-clear'
                  onClick={(e) => {
                    setApplicationDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={applicationDate}
                onChange={(e) => {
                  setApplicationDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Interviews</span>
                <span
                  className='detailModal-date-clear'
                  onClick={(e) => {
                    setInterviewDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={interviewDate}
                onChange={(e) => {
                  setInterviewDate(e.target.valu);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Offer</span>
                <span
                  className='detailModal-date-clear'
                  onClick={(e) => {
                    setOfferDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={offerDate}
                onChange={(e) => {
                  setOfferDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='detailModal-date-container'>
                <span className='detailModal-date-title'>Offer Acceptance</span>
                <span
                  className='detailModal-date-clear'
                  onClick={(e) => {
                    setOfferAcceptanceDate('');
                  }}
                >
                  Clear
                </span>
              </Form.Label>
              <Form.Control
                type='date'
                value={offerAcceptanceDate}
                onChange={(e) => {
                  setOfferAcceptanceDate(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Row>
        </Col>
        <Button
          className='detail-modal-updateButton detailModal-updateButton-xs'
          onClick={handleUpdateButtonClick}
        >
          Update
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AppDetailsModal;
