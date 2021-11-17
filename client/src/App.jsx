import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { loginFirebaseUser } from './actions/userActions';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import './styles/app.css';
import { Row } from 'react-bootstrap';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        let email = 'sam@example.com';
        dispatch(loginFirebaseUser({ email, uid }));
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <main className='app-main'>
        <Row className='app-main-container'>
          <Switch>
            <Route component={LandingScreen} path='/info' />
            <Route component={HomeScreen} path='/' />
          </Switch>
        </Row>
      </main>
    </Router>
  );
};

export default App;
