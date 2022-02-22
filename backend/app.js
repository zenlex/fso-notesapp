// IMPORTS
const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testingRouter = require('./controllers/tests');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to MongoDB');

mongoose.connect(config.MONGODB_URI)
  .then((result) => {
    logger.info('connected to MongoDB', result.connections[0].host);
  })
  .catch((err) => {
    logger.info('error connecting to MongoDB: ', err.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing/', testingRouter);
}
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;