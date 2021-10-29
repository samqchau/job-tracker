import expressAsyncHandler from 'express-async-handler';
import pool from '../database/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const loginFirebaseUser = expressAsyncHandler(async (req, res) => {
  try {
    const { email, uid } = req.body;
    let user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    user = user.rows[0];
    if (user) {
      user.token = generateToken(user.id);
      res.json(user);
    } else {
      let user = await pool.query(
        'INSERT INTO users (email, id) VALUES ($1, $2) RETURNING *;',
        [email, uid]
      );
      user = user.rows[0];
      user.token = generateToken(user.id);
      res.json(user);
    }
  } catch (error) {
    res.status(400);
    console.error(error.message);
  }
});

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

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  let user = await pool.query(
    'INSERT INTO users (first_name, family_name, email, password, username) values($1, $2, $3, $4, $5) RETURNING *',
    [firstName, familyName, email, hashedPassword, username]
  );
  if (user) {
    user = user.rows[0];
    user.token = generateToken(user.id);
    delete user.id;
    res.json(user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  user = user.rows[0];
  if (user) {
    if (
      (await bcrypt.compare(password, user.password)) ||
      password == user.password
    ) {
      const timestamp = new Date().toLocaleString('en-US');
      await pool.query('UPDATE users SET last_logged = $1 WHERE email = $2', [
        timestamp,
        email,
      ]);
      user.token = generateToken(user.id);
      delete user.id;
      delete user.password;
      delete user.registered;
      delete user.last_logged;
      delete user.is_admin;
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
