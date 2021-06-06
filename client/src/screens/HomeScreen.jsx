import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import JobsTable from '../components/JobsTable';
import AppList from '../components/AppList';

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  return (
    <>
      <AppList name='wishlist' icon='far fa-star' />
      <AppList name='applied' icon='far fa-file' />
      <AppList name='phone' icon='fas fa-phone-square-alt' />
      <AppList name='on site' icon='fas fa-map-marker-alt' />
      <AppList name='offer' icon='fas fa-trophy' />
      <AppList name='rejected' icon='far fa-thumbs-down' />
      <JobsTable></JobsTable>
    </>
  );
};

export default HomeScreen;
