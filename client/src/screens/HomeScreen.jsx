import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppList from '../components/AppList';
import { fetchUserApps } from '../actions/appActions';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(fetchUserApps());
  }, [dispatch]);

  return (
    <>
      <AppList name='wishlist' icon='far fa-star' nameValue={1} />
      <AppList name='applied' icon='far fa-file' nameValue={2} />
      <AppList name='phone' icon='fas fa-phone-square-alt' nameValue={3} />
      <AppList name='on site' icon='fas fa-map-marker-alt' nameValue={4} />
      <AppList name='offer' icon='fas fa-trophy' nameValue={5} />
      <AppList name='rejected' icon='far fa-thumbs-down' nameValue={6} />
    </>
  );
};

export default HomeScreen;
