import expressAsyncHandler from 'express-async-handler';
import pool from '../database/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { password, firstName, familyName, email, username } = req.body;
  let userExists = await pool.query(
    'SELECT email FROM users WHERE email = $1',
    [email]
  );

  userExists = userExists.rows[0];

  if (userExists) {
    res.status(400);
    throw new Error('This email is connected to another account');
  }

  let user = await pool.query(
    'INSERT INTO users (first_name, family_name, email, password, username) values($1, $2, $3, $4, $5) RETURNING *',
    [firstName, familyName, email, password, username]
  );
  if (user) {
    user = user.rows[0];
    user.token = generateToken(user._id);
    delete user.password;
    delete user._id;
    res.json(user);
  } else {
    throw new Error('Invalid user data');
    res.status(400);
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  user = user.rows[0];
  if (user) {
    if (password === user.password) {
      const timestamp = new Date().toLocaleString('en-US');
      console.log(timestamp);
      await pool.query('UPDATE users SET last_logged = $1 WHERE email = $2', [
        timestamp,
        email,
      ]);
      res.json(user);
    } else {
      res.status(400);
      throw new Error(
        'The password you entered is incorrect. Please try again.'
      );
    }
  } else {
    res.status(400);
    throw new Error('Are you sure you entered your email correctly?');
  }
});
