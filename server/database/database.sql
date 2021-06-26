CREATE DATABASE jobtracker;

CREATE TABLE users(
  id  uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  password TEXT NOT NULL,
  first_name VARCHAR(15) NOT NULL,
  family_name VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL UNIQUE,
  registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_logged TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  username VARCHAR(20) NOT NULL
);

CREATE TABLE applications (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  company_name VARCHAR(20) NOT NULL,
  job_title VARCHAR(20) NOT NULL,
  date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status INTEGER REFERENCES status(id),
  user_id uuid REFERENCES users(id) NOT NULL,
  salary INTEGER DEFAULT null,
  url TEXT default null,
  color VARCHAR(7) DEFAULT '#FFFFFF',
  list INTEGER REFERENCES lists(id) NOT NULL DEFAULT 1
);

CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE notes (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  application_id uuid REFERENCES applications(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO notes (application_id, user_id, content) VALUES ('aed176d9-4481-4565-bdc2-00932ea3b54c', 'c925757d-6229-46a2-ba9e-117db3049213', 'This is my note for application');

CREATE TABLE lists (id SERIAL PRIMARY KEY, name VARCHAR(15) NOT NULL);

INSERT INTO status (name) VALUES ('pending');

SELECT * FROM applications LEFT JOIN status ON applications.status = status.id;

SELECT applications.id, company_name, status.name FROM applications INNER JOIN status ON applications.status=status.id;

INSERT INTO applications (company_name, job_title, status) VALUES ('Amazon', 'Frontend 1', 3);

GET USER BY email
SELECT * FROM users WHERE email = 'sam@example.com';

UPDATE applications SET color = '#ffffff' WHERE color = '#FFFFFF';

SELECT a.id, jsonb_agg(n.application_id) 
FROM applications a
  LEFT JOIN notes n ON a.id = n.application_id
WHERE user_id = '1KjQ76oKYLUO8Fe5W8pNB1012ui1'
GROUP BY 1
ORDER BY a.id;

SELECT a.id, a.company_name, a.job_title, a.date_applied, a.last_updated, a.favorited, a.list, a.url, a.color, a.salary, a.location, a.location, a.description, a.index, a.deadline, a.application, a.offer, a.offer_acceptance, a.interview, a.fav_index, jsonb_agg(n.application_id) FROM applications a LEFT JOIN notes n ON a.id = n.application_id WHERE user_id = '1KjQ76oKYLUO8Fe5W8pNB1012ui1' GROUP BY 1 ORDER BY a.id;