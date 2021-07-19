const { Pool } = require('pg');
const logger = require('../logger');
const Database = require('./databaseClass');
const { postgres } = require('./config');

/* ============================================================================
   ========================= POSTGRES CONNECTION ==============================
   ============================================================================
*/
const connection = new Pool(postgres);
const db = new Database(connection);
db.connect()
  .then(() => {
    logger.info(`Connected to Postgres !
    ==================================
    Host : ${db.connection.options.host}
    Database : ${db.connection.options.database}
    ==================================
    `);
  })
  .catch((error) => {
    logger.error(error);
  });

module.exports = db;
