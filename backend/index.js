// IMPORTS
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const Note = require('./models/note');

// MIDDLEWARE
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}
app.use(cors());
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

// ROUTES
app.post('/api/notes', (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      res.json(savedNote.toJSON())
    })
    .catch(err => next(err))
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
});

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  })
  .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
  const originalNote = {
    content: req.body.content,
    important: req.body.important
  }
  Note.findByIdAndUpdate(req.params.id, originalNote, { new: true })
    .then((updatedNote) => {
    res.json(updatedNote)
  })
  .catch(err => next(err))
})

// UNKNOWN ENDPOINT HANDLER
const unknownEndpoint = (req, res) => {
  res.status(404).send( {error: 'unknwon endpoint'})
}
app.use(unknownEndpoint)

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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})