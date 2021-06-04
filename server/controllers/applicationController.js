import expressAsyncHandler from 'express-async-handler';
import pool from '../database/db.js';

export const createNewApplication = expressAsyncHandler(async (req, res) => {
  try {
    const { companyName, jobTitle, status } = req.body;
    console.log(req.user);
    const { id } = req.user;

    const newApplication = await pool.query(
      'INSERT INTO applications (company_name, job_title, status, user_id) VALUES($1, $2, $3, $4) RETURNING *',
      [companyName, jobTitle, status, id]
    );

    res.json(newApplication.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

export const getApplicationsByUserId = expressAsyncHandler(async (req, res) => {
  try {
    const applications = await pool.query('SELECT * FROM applications');
    res.json(applications.rows);
  } catch (error) {
    console.error(error.message);
  }
});
