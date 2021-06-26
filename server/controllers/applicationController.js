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
        'UPDATE applications SET index = index + 1 WHERE ($1 = user_id AND list = $2 AND id != $3) RETURNING *;',
        [id, list, newApplication.id]
      );
    }

    res.json(newApplication);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const getApplicationsByUserId = expressAsyncHandler(async (req, res) => {
  try {
    const applications = await pool.query(
      'SELECT a.id, a.company_name, a.job_title, a.date_applied, a.last_updated, a.favorited, a.list, a.url, a.color, a.salary, a.location, a.location, a.description, a.index, a.deadline, a.application, a.offer, a.offer_acceptance, a.interview, a.fav_index, jsonb_agg(n) AS notes FROM applications a LEFT JOIN notes n ON a.id = n.application_id WHERE user_id = $1 GROUP BY 1 ORDER BY a.list;',
      [req.user.id]
    );
    res.json(applications.rows);
  } catch (error) {
    console.error(error.message);
  }
});

export const getApplicationsWithNotesByUserId = expressAsyncHandler(
  async (req, res) => {
    try {
      const applications = await pool.query(
        'SELECT a.id, a.company_name, a.job_title, a.date_applied, a.last_updated, a.favorited, a.list, a.url, a.color, a.salary, a.location, a.location, a.description, a.index, a.deadline, a.application, a.offer, a.offer_acceptance, a.interview, a.fav_index, jsonb_agg(n) AS notes FROM applications a LEFT JOIN notes n ON a.id = n.application_id WHERE user_id = $1 GROUP BY 1 ORDER BY a.list;',
        [req.user.id]
      );
      res.json(applications.rows);
    } catch (error) {
      console.error(error.message);
    }
  }
);

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
          'UPDATE applications SET index = index - 1 WHERE (user_id = $1 AND list = $2 AND index > $3 AND index <= $4);',
          [userId, sourceListId, sourceIndex, destinationIndex]
        );

        await pool.query('UPDATE applications SET index = $1 WHERE id = $2;', [
          destinationIndex,
          appId,
        ]);
      } else {
        await pool.query(
          'UPDATE applications SET index = index + 1 WHERE (user_id = $1 AND list = $2 AND index < $3 AND index >= $4);',
          [userId, sourceListId, sourceIndex, destinationIndex]
        );

        await pool.query('UPDATE applications SET index = $1 WHERE id = $2', [
          destinationIndex,
          appId,
        ]);
      }
    } else {
      await pool.query(
        'UPDATE applications SET index = index - 1 WHERE (user_id = $1 AND list = $2 AND index > $3);',
        [userId, sourceListId, sourceIndex]
      );

      await pool.query(
        'UPDATE applications SET index = index + 1 WHERE (user_id = $1 AND list = $2 AND index >= $3);',
        [userId, destinationListId, destinationIndex]
      );

      await pool.query(
        'UPDATE applications SET index = $1, list = $2 WHERE id = $3;',
        [destinationIndex, destinationListId, appId]
      );
    }
    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

export const deleteAppById = expressAsyncHandler(async (req, res) => {
  try {
    const { id, index, list, fav_index, favorited } = req.body;
    const { id: userId } = req.user;

    await pool.query(
      'UPDATE applications SET index = index - 1 WHERE (index > $1 and list = $2 and user_id = $3);',
      [index, list, userId]
    );
    await pool.query('DELETE FROM notes WHERE application_id = $1', [id]);
    await pool.query('DELETE FROM applications WHERE id = $1;', [id]);
    if (favorited) {
      await pool.query(
        'UPDATE applications SET fav_index = fav_index - 1 WHERE (fav_index >= $1 AND user_id = $2);',
        [fav_index, userId]
      );
    }
  } catch (error) {
    console.error(error);
  }
  res.end();
});

export const toggleFavorited = expressAsyncHandler(async (req, res) => {
  const { favorited, id } = req.body;
  const { id: userId } = req.user;
  if (favorited) {
    await pool.query(
      'UPDATE applications SET fav_index = fav_index + 1 WHERE (fav_index >= 0 and user_id = $1);',
      [userId]
    );
    await pool.query('UPDATE applications SET fav_index = 0 WHERE (id = $1);', [
      id,
    ]);
  } else {
    let prevFavIndex = await pool.query(
      'SELECT fav_index FROM applications WHERE (id = $1);',
      [id]
    );
    prevFavIndex = prevFavIndex.rows[0];

    await pool.query(
      'UPDATE applications SET fav_index = fav_index - 1 WHERE (fav_index > $1 and user_id = $2);',
      [prevFavIndex.fav_index, userId]
    );
    await pool.query(
      'UPDATE applications SET fav_index = NULL WHERE (id = $1);',
      [id]
    );
  }
  res.end();
});

export const updateFavIndices = expressAsyncHandler(async (req, res) => {
  const { sourceIndex, destinationIndex, appId } = req.body;

  const { id: userId } = req.user;
  if (sourceIndex < destinationIndex) {
    await pool.query(
      'UPDATE applications SET fav_index = fav_index - 1 WHERE (user_id = $1 AND fav_index > $2 AND fav_index <= $3);',
      [userId, sourceIndex, destinationIndex]
    );
    await pool.query(
      'UPDATE applications SET fav_index = $1 WHERE (id = $2);',
      [destinationIndex, appId]
    );
  } else {
    await pool.query(
      'UPDATE applications SET fav_index = fav_index + 1 WHERE (fav_index < $1 AND fav_index >= $2 AND user_id = $3);',
      [sourceIndex, destinationIndex, userId]
    );
    await pool.query(
      'UPDATE applications SET fav_index = $1 WHERE (id = $2);',
      [destinationIndex, appId]
    );
  }
  res.end();
});

export const updateAppById = expressAsyncHandler(async (req, res) => {
  try {
    let {
      id,
      company_name,
      job_title,
      favorited,
      url,
      color,
      salary,
      location,
      description,
      deadline,
      application,
      offer,
      offer_acceptance,
      interview,
    } = req.body;

    await pool.query(
      'UPDATE applications SET company_name = $1, job_title = $2, favorited = $3, url = $4, color = $5, salary = $6, location = $7, description = $8, deadline = $9, application = $10, offer = $11, offer_acceptance = $12, interview = $13 where id = $14;',
      [
        company_name,
        job_title,
        favorited,
        url,
        color,
        salary,
        location,
        description,
        deadline,
        application,
        offer,
        offer_acceptance,
        interview,
        id,
      ]
    );

    res.end();
  } catch (error) {
    console.error(error.message);
  }
});

export const getNotesByApplicationId = expressAsyncHandler(async (req, res) => {
  const { appId } = req.params;
  let notes = await pool.query(
    'SELECT id, application_id, content, created_on, last_updated FROM notes WHERE (application_id = $1) ORDER BY created_on DESC;',
    [appId]
  );
  notes = notes.rows;
  res.json(notes);
});
