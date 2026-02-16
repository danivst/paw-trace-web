import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',      // your MySQL password here
  database: 'pawtrace',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
