import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppList from '../components/AppList';
import { fetchUserApps } from '../actions/appActions';
import DragDropContextComponent from '../components/DragDropContextComponent';
import OpenFavorites from '../components/OpenFavorites';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/info');
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(fetchUserApps());
  }, [dispatch]);

  return (
    <>
      <DragDropContextComponent>
        <AppList name='wishlist' icon='far fa-star' listIntFromDB={1} />
        <AppList name='applied' icon='far fa-file' listIntFromDB={2} />
        <AppList
          name='phone'
          icon='fas fa-phone-square-alt'
          listIntFromDB={3}
        />
        <AppList
          name='on site'
          icon='fas fa-map-marker-alt'
          listIntFromDB={4}
        />
        <AppList name='offer' icon='fas fa-trophy' listIntFromDB={5} />
        <AppList name='rejected' icon='far fa-thumbs-down' listIntFromDB={6} />
      </DragDropContextComponent>
      <OpenFavorites />
    </>
  );
};

export default HomeScreen;
