import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import NewAppModal from './modals/NewAppModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserApps } from '../actions/appActions';
import Loader from './Loader';
import Message from './Message';

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

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userApps = useSelector((state) => state.userApps);
  const { apps, loading, success, error } = userApps;

  useEffect(() => {
    dispatch(fetchUserApps());
  }, [dispatch]);

  return userInfo ? (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.message}</Message>
      ) : (
        success &&
        apps.length > 0 && (
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
              {apps.map((app, i) => (
                <tr key={app.id}>
                  <td>{app.company_name}</td>
                  <td>{app.favorited ? 'favorited' : 'not favorited'}</td>
                  <td>{app.job_title}</td>
                  <td>{new Date(app.date_applied).toLocaleString()}</td>
                  <td>{new Date(app.last_updated).toLocaleString()}</td>
                  <td>{app.status}</td>
                  <td>
                    <Button variant='dark'>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}

      <NewAppModal show={show} handleClose={handleClose} />
    </>
  ) : null;
};

export default JobsTable;
