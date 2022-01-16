import React, { useEffect } from 'react';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/landingScreen.css';
import { Row, Col } from 'react-bootstrap';
import LoginCard from '../components/LoginCard';
import Demo from '../components/Demo';
import TeamCard from '../components/TeamCard';
import { loginFirebaseUser } from '../actions/userActions';

const LandingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (userInfo && userInfo.id === null) {
        let uid = user.uid;
        let email = 'sam@example.com';
        dispatch(loginFirebaseUser({ email, uid }));
      }
    });
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.id !== null) {
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
            <div className='landing-section-title' style={{ marginTop: '0px' }}>
              Controls and Functions
            </div>
            <ul>
              <li>Drag & Drop to Organize</li>
              <li>Bookmark Important Cards</li>
              <li>Click for Details & Notes</li>
            </ul>
            <div className='landing-main-left-demo-container'>
              <Demo />
            </div>
            <div
              className='landing-main-left-demo-caption'
              style={{ marginTop: '5px' }}
            ></div>

            <TeamCard />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LandingScreen;
