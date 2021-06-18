import pool from '../database/db.js';
import expressAsyncHandler from 'express-async-handler';

export const createNote = expressAsyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    let data = await pool.query(
      'INSERT INTO notes (application_id, user_id, content) VALUES ($1, $2, $3) RETURNING *;',
      [id, req.user.id, content]
    );
    data = data.rows[0];
    res.json(data);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid content');
  }
});
export const updateNoteById = expressAsyncHandler(async (req, res) => {});
export const deleteNoteById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await pool.query('DELETE FROM notes WHERE id = $1;', [id]);
  res.end();
});
