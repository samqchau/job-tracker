import expressAsyncHandler from 'express-async-handler';
import pool from '../database/db.js';

export const createNewApplication = expressAsyncHandler(async (req, res) => {
  try {
    let {
      companyName,
      jobTitle,
      list,
      url,
      salary,
      location,
      color,
      description,
    } = req.body;
    const { id } = req.user;
    list = Number(list);
    salary = Number(salary);
    let newApplication = await pool.query(
      'INSERT INTO applications (company_name, job_title, user_id, list, url, color, salary, location, description, index) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, 0) RETURNING *',
      [
        companyName,
        jobTitle,
        id,
        list,
        url,
        color,
        salary,
        location,
        description,
      ]
    );
    newApplication = newApplication.rows[0];
    let updatedApps;
    if (newApplication) {
      updatedApps = await pool.query(
        'UPDATE applications SET index = index + 1 WHERE $1 = user_id AND list = $2 AND id != $3 RETURNING *',
        [id, list, newApplication.id]
      );
    }

    console.log(updatedApps.rows);

    res.json(newApplication);
  } catch (error) {
    console.error(error.message);
  }
});

export const getApplicationsByUserId = expressAsyncHandler(async (req, res) => {
  try {
    const applications = await pool.query(
      'SELECT * FROM applications WHERE user_id = $1',
      [req.user.id]
    );
    res.json(applications.rows);
  } catch (error) {
    console.error(error.message);
  }
});
