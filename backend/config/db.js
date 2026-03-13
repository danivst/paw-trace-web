import { Sequelize } from 'sequelize';

// allow switching dialect via environment variable; default is mysql
const DIALECT = 'sqlite';
const OPTIONS = { dialect: DIALECT };

if (DIALECT === 'mysql' || DIALECT === 'mariadb' || DIALECT === 'postgres') {
  // standard TCP connection
  OPTIONS.host = process.env.DB_HOST || 'localhost';
  OPTIONS.username = process.env.DB_USER || 'root';
  OPTIONS.password = process.env.DB_PASS || '';
  OPTIONS.database = process.env.DB_NAME || 'pawtrace';
} else if (DIALECT === 'sqlite') {
  // file-based storage; defaults to database.sqlite in project root
  OPTIONS.storage = process.env.DB_STORAGE || 'pawtrace.sqlite';
  // sqlite does not need username/password/host
} else {
  throw new Error(`Unsupported DB_DIALECT: ${DIALECT}`);
}

const sequelize = new Sequelize(
  // database name is ignored by sqlite but sequelize requires first arg
  process.env.DB_NAME || 'pawtrace',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  OPTIONS
);

export default sequelize;