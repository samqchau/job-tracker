import React from 'react';
import { Container } from 'react-bootstrap';
import JobsTable from './components/JobsTable';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/app.css';

const App = () => {
  return (
    <>
      <Header />
      <main className='app-main'>
        <Container className='app-main-container'>
          <JobsTable />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
