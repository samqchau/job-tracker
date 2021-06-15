import React, { useState } from 'react';
import '../styles/openFavorites.css';
import FavoritedAppsModal from './modals/FavoritedAppsModal';

const OpenFavorites = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleClose = () => {
    setShowFavorites(false);
  };

  return (
    <>
      <div
        className='openFavorites'
        title='Show Favorites'
        onClick={(e) => {
          e.stopPropagation();
          setShowFavorites(true);
        }}
      >
        <i className='fas fa-star openFavorites-icon fa-lg' />
      </div>
      <FavoritedAppsModal show={showFavorites} onHide={handleClose} />
    </>
  );
};

export default OpenFavorites;
