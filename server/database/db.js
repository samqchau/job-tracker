import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const Pool = pg.Pool;

const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const port = process.env.PG_PORT;
const database = process.env.PG_DATABASE;

const pool = new Pool({
  user,
  password,
  host: 'host.docker.internal',
  port,
  database,
});

export default pool;
