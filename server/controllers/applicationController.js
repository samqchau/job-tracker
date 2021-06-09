import expressAsyncHandler from 'express-async-handler';
import pool from '../database/db.js';
import listNameValuePairs from '../database/listNameValuePairs.js';

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

export const updateAppIndices = expressAsyncHandler(async (req, res) => {
  const { sourceIndex, destinationIndex, sourceList, destinationList, appId } =
    req.body;
  const { id: userId } = req.user;

  let sourceListId = listNameValuePairs[sourceList];
  let destinationListId = listNameValuePairs[destinationList];

  try {
    if (sourceList === destinationList) {
      if (sourceIndex < destinationIndex) {
        await pool.query(
          'UPDATE applications SET index = index - 1 WHERE (user_id = $1 AND list = $2 AND index > $3 AND index <= $4)',
          [userId, sourceListId, sourceIndex, destinationIndex]
        );

        await pool.query('UPDATE applications SET index = $1 WHERE id = $2', [
          destinationIndex,
          appId,
        ]);
      } else {
        await pool.query(
          'UPDATE applications SET index = index + 1 WHERE (user_id = $1 AND list = $2 AND index < $3 AND index >= $4)',
          [userId, sourceListId, sourceIndex, destinationIndex]
        );

        await pool.query('UPDATE applications SET index = $1 WHERE id = $2', [
          destinationIndex,
          appId,
        ]);
      }
    } else {
      console.log(sourceListId);
      console.log(destinationListId);
      console.log(sourceIndex);
      await pool.query(
        'UPDATE applications SET index = index - 1 WHERE (user_id = $1 AND list = $2 AND index > $3)',
        [userId, sourceListId, sourceIndex]
      );

      await pool.query(
        'UPDATE applications SET index = index + 1 WHERE (user_id = $1 AND list = $2 AND index >= $3)',
        [userId, destinationListId, destinationIndex]
      );

      await pool.query(
        'UPDATE applications SET index = $1, list = $2 WHERE id = $3',
        [destinationIndex, destinationListId, appId]
      );
    }
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});
