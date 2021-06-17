import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-router-bootstrap';
import '../styles/modalNav.css';

const DetailModalNav = () => {
  return (
    <div className='modal-nav-container'>
      <Link to='/home/details' className='modal-nav-link modal-nav-link-active'>
        Details
      </Link>
      <Link to='/home/notes' className='modal-nav-link'>
        Notes
      </Link>
    </div>
  );
};

export default DetailModalNav;
