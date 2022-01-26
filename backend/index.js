// IMPORTS
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const Note = require('./models/note');

// MIDDLEWARE
app.use(express.json())
app.use(cors());
app.use(express.static('build'))

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

// ROUTES
app.post('/api/notes', (req, res) => {

  const body = req.body;

  if(!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }
  
  notes = notes.concat(note)

  res.json(note);
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
  // res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log({ id })
  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id
  })
  console.log(note);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id);

  res.status(204).end();
})

// REQUEST LISTENER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})