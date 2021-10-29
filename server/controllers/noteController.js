import pool from '../database/db.js';
import expressAsyncHandler from 'express-async-handler';

export const createNote = expressAsyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    let data = await pool.query(
      'INSERT INTO notes (application_id, content) VALUES ($1, $2) RETURNING *;',
      [id, content]
    );
    data = data.rows[0];
    res.json({ ...data, editing: false });
  } catch (error) {
    res.status(400);
    throw new Error('Invalid content');
  }
});

export const updateNoteById = expressAsyncHandler(async (req, res) => {
  let { content, noteId } = req.body;
  let data = await pool.query(
    'UPDATE notes SET content = $1, last_updated = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;',
    [content, noteId]
  );
  data = data.rows[0];
  delete data.user_id;
  res.json({ ...data, editing: false });
});

export const deleteNoteById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM notes WHERE id = $1;', [id]);
  res.end();
});
