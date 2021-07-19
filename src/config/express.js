const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { logs } = require('./vars');
const routes = require('./routes');

const app = express();

// API Dependencies
app.use(helmet());
app.use(morgan(logs));
app.use(methodOverride());
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Access-Control-Allow-Headers',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    limit: '500kb',
    strict: true,
  })
);

// API Routes
app.use(routes);

module.exports = app;
