const { Pool } = require('pg');
const DatabaseClass = require('./../app/core/database');
const logger = require('./logger');

const config = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DBNAME,
  port: process.env.POSTGRES_PORT,
  dialect: process.env.POSTGRES_DIALECT,
  keepAlive: true,
};



const client = new Pool(config);
const db = new DatabaseClass(client);

db
  .connect()
  .then(() => {
    logger.info(`Connected to Postgres !
    ==================================
    Host : ${process.env.POSTGRES_HOST}
    Database : ${process.env.POSTGRES_DBNAME}
    ==================================
    `);
  })
  .catch((error) => {
    logger.error(error.message);
  });

module.exports = db;
