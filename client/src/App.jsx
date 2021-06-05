import React from 'react';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import store from './stores/store.js';
import './styles/app.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className='app-main'>
          <Container className='app-main-container'>
            <Route component={LandingScreen} path='/' exact />
            <Route component={HomeScreen} path='/home' />
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
