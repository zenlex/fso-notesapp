// IMPORTS
const config = require('./utils/config')
const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

console.log('connecting to MongoDB');

mongoose.connect(config.MONGODB_URIj)
  .then((result) => {
    logger.info('connected to MongoDB', result.connections[0].host);
  })
  .catch((err) => {
    logger.info('error connecting to MongoDB: ', err.message)
  })

app.use(cors());
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app