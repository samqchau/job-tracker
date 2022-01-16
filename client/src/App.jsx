import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import './styles/app.css';
import { Row } from 'react-bootstrap';

const App = () => {
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
