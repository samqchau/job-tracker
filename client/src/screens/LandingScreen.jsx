import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import '../styles/landingScreen.css';
import { Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';

const LandingScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  return (
    <>
      <Row className='landing-main-container'>
        <Col xs={12} md={4}></Col>
        <Col xs={12} md={4}>
          <LoginForm />
        </Col>
        <Col xs={12} md={4}></Col>
      </Row>
      <Footer />
    </>
  );
};

export default LandingScreen;
