import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/modalNav.css';

const DetailModalNav = ({ app }) => {
  return (
    <div className='modal-nav-container'>
      <Link
        to={`/app_details/${app.id}`}
        className='modal-nav-link modal-nav-link-active'
      >
        Details
      </Link>
      <Link to={`/app_notes/${app.id}`} className='modal-nav-link'>
        Notes
      </Link>
    </div>
  );
};

export default DetailModalNav;
