import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../styles/modalNav.css';

const DetailModalNav = ({ app }) => {
  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;
  const routeName = path.split('/')[1];

  return (
    <div className='modal-nav-container'>
      <Link
        to={`/app_details/${app.id}`}
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/app_details/${app.id}`);
        }}
        className={`modal-nav-link ${
          routeName === 'app_details' ? 'modal-nav-link-active' : ''
        }`}
      >
        Details
      </Link>
      <Link
        to={`/app_notes/${app.id}`}
        className={`modal-nav-link ${
          routeName === 'app_notes' ? 'modal-nav-link-active' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          history.push(`/app_notes/${app.id}`);
        }}
      >
        Notes
      </Link>
    </div>
  );
};

export default DetailModalNav;
