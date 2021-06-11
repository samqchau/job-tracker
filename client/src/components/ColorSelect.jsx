import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/colorSelect.css';
import { colorsArr } from '../styles/colorPallet';

const ColorSelect = ({ color, setColor }) => {
  const [showColorSelect, setShowColorSelect] = useState(false);

  const closeColorSelect = () => {
    setShowColorSelect(false);
  };

  const openColorSelect = () => {
    setShowColorSelect(true);
  };

  return (
    <>
      <div className='colorSelect' onClick={openColorSelect}>
        <div className={`colorSelect-content ${color}`}></div>
      </div>
      {showColorSelect && (
        <Row className='colorSelect-menu' onMouseLeave={closeColorSelect}>
          {colorsArr.map((clr, i) => (
            <Col
              xs={1}
              sm={2}
              md={4}
              className='colorSelect-menu-option-container'
            >
              <div
                className='colorSelect-menu-option-border'
                onClick={(e) => {
                  setColor(clr);
                }}
              >
                <div className={`${clr} colorSelect-menu-option`}></div>
              </div>
            </Col>
          ))}
        </Row>
      )}{' '}
    </>
  );
};

export default ColorSelect;
