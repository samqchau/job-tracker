import React from 'react';
import { Container } from 'react-bootstrap';
import JobsTable from './components/JobsTable';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/app.css';
import store from './stores/store.js';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className='app-main'>
        <Container className='app-main-container'>
          <JobsTable />
        </Container>
      </main>
      <Footer />
    </Provider>
  );
};

export default App;
