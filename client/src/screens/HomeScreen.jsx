import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomeScreen = ({ history }) => {
  const userInfo = useSelector((state) => state.userInfo);
  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  return <div>Home</div>;
};

export default HomeScreen;
