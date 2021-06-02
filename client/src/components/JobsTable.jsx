import React from 'react';
import { Table, Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

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
  return (
    <Table size='sm' striped bordered hover>
      <thead>
        <tr>
          <th>
            <Button variant='success' size='sm'>
              <AddIcon></AddIcon>
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
  );
};

export default JobsTable;
