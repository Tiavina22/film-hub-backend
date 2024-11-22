require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'filmhub',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  }
};