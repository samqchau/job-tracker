import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import JobsTable from '../components/JobsTable';

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  return <JobsTable></JobsTable>;
};

export default HomeScreen;
