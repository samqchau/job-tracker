import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LandingScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  return <div>Landed</div>;
};

export default LandingScreen;
