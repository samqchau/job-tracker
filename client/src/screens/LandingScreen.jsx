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
      <div className='landing-main'>
        <Row className='landing-main-container'>
          <Col className='landing-main-center' sm={12} lg={6}>
            <LoginCard />
            <div className='landing-func-container'>
              <div className='landing-section-title'>
                Ground Control for your Job Hunt
              </div>
              <div className='landing-section-content'>
                JobTrackr is a free, secure, and easily accessible web app that
                helps users track and organize applications during the job hunt.
                Visualize the state of your job search in a single board. See
                how many applications, interviews and offers you’ve received in
                one view.
              </div>
            </div>
          </Col>
          <Col className='landing-main-left' sm={12} lg={6}>
            <div className='landing-main-left-demo-container'>
              <div className='landing-section-title'>
                Drag & Drop for Quick Changes
              </div>
            </div>

            <div className='landing-section-title'>
              Changes are automatically saved
            </div>
            <div className='landing-section-content'>
              JobTrackr is a free, secure, easily-accessible web app that helps
              users track and organize applications during the job hunt.
              Visualize the state of your job search in a single board. See how
              many applications, interviews and offers you’ve received in one
              view.
            </div>
          </Col>
          <LoginForm />
        </Row>
        <Footer />
      </div>
    </>
  );
};

export default LandingScreen;
