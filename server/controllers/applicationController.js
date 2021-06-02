import expressAsyncHandler from 'express-async-handler';
import pool from '../database/db.js';

export const createNewApplication = expressAsyncHandler(async (req, res) => {
  try {
    const { companyName, jobTitle, status } = req.body;

    const newApplication = await pool.query(
      'INSERT INTO applications (company_name, job_title, status) VALUES($1, $2, $3) RETURNING *',
      [companyName, jobTitle, status]
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
