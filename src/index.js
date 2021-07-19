const { Pool } = require('pg');
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');

const Database = require('./config/database/databaseClass');
const { postgres } = require('./config/database/config');

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
    console.log(error.stack);
    logger.error(error);
  });

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

module.exports = app;
