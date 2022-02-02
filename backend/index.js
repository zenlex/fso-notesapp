// IMPORTS
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)


// MIDDLEWARE


// ERROR HANDLING
const errorHandler = (err, req, res, next) => {
  console.error(err.message) 

  if(err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}
app.use(errorHandler);

// REQUEST LISTENER
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})