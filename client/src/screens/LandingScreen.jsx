import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import '../styles/landingScreen.css';
import { Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import LoginCard from '../components/LoginCard';

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
        <Col className='landing-main-center' sm={12} md={6}>
          <LoginCard />
          <LoginForm />
        </Col>
        <Col className='landing-main-left' sm={12} md={6}></Col>
      </Row>
      <Footer />
    </>
  );
};

export default LandingScreen;
