CREATE DATABASE jobtracker;

CREATE TABLE users(
  id  uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  user_password TEXT NOT NULL,
  first_name VARCHAR(15) NOT NULL,
  family_name VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL UNIQUE,
  registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_logged TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE applications (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  company_name VARCHAR(20) NOT NULL,
  job_title VARCHAR(20) NOT NULL,
  date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status INTEGER REFERENCES status(id)
);

CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
);