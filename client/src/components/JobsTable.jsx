import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import NewAppModal from './modals/NewAppModal';

const rows = [
  {
    companyName: 'Apple',
    favorited: true,
    jobTitle: 'Software Engineer',
    dateApplied: Date.now(),
    lastUpdated: Date.now(),
    status: 'Pending',
  },
  {
    companyName: 'Apple',
    favorited: true,
    jobTitle: 'Software Engineer',
    dateApplied: Date.now(),
    lastUpdated: Date.now(),
    status: 'Pending',
  },
  {
    companyName: 'Apple',
    favorited: true,
    jobTitle: 'Software Engineer',
    dateApplied: Date.now(),
    lastUpdated: Date.now(),
    status: 'Pending',
  },
];

const JobsTable = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>
              <Button variant='success' size='sm'>
                <AddIcon onClick={handleShow}></AddIcon>
              </Button>
            </th>
          </tr>
          <tr>
            <th>Company Name</th>
            <th>Favorite</th>
            <th>Job Title</th>
            <th>Date Applied</th>
            <th>Last Updated</th>
            <th>Status</th>
            <th>Buttons area</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.companyName}</td>
              <td>{row.favorited ? 'favorited' : 'not favoriated'}</td>
              <td>{row.jobTitle}</td>
              <td>{new Date(row.dateApplied).toLocaleString()}</td>
              <td>{new Date(row.lastUpdated).toLocaleString()}</td>
              <td>{row.status}</td>
              <td>
                <Button variant='dark'>Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <NewAppModal show={show} handleClose={handleClose} />
    </>
  );
};

export default JobsTable;
