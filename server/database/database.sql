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
  status INTEGER REFERENCES status(id),
  user_id uuid REFERENCES users(_id)
);

CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE notes (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  application uuid REFERENCES applications,
  content TEXT NOT NULL 
);

INSERT INTO status (name) VALUES ('pending');

SELECT * FROM applications LEFT JOIN status WHERE applications.status = status.id;

SELECT applications.id, company_name, status.name FROM applications INNER JOIN status ON applications.status=status.id;

INSERT INTO applications (company_name, job_title, status) VALUES ('Amazon', 'Frontend 1', 3);