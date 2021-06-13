import React from 'react';
import { useDispatch } from 'react-redux';
import '../styles/favoriteButton.css';
import { updateAppById } from '../actions/appActions';

const FavoriteButton = ({ app }) => {
  const dispatch = useDispatch();
  let { favorited } = app;

  const handleClick = () => {
    let updatedApp = app;
    updatedApp.favorited = !favorited;
    dispatch(updateAppById(updatedApp));
  };

  return (
    <i
      className={` ${`${favorited ? 'fas' : 'far'} fa-star`} favoriteButton`}
      onClick={handleClick}
    ></i>
  );
};

export default FavoriteButton;
