import expressAsyncHandler from 'express-async-handler';
import pool from '../database/db.js';
import bcrypt from 'bcryptjs';

export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { password, firstName, familyName, email } = req.body;
  let userExists = await pool.query(
    'SELECT email FROM users WHERE email = $1',
    [email]
  );

  userExists = userExists.rows[0];

  if (userExists) {
    res.status(400);
    throw new Error('This email is connected to another account');
  }

  const user = await pool.query(
    'INSERT INTO users (first_name, family_name, email, password) values($1, $2, $3, $4) RETURNING *',
    [firstName, familyName, email, password]
  );
  if (user) {
    res.json(user.rows[0]);
  } else {
    throw new Error('Invalid user data');
    res.status(400);
  }
});
