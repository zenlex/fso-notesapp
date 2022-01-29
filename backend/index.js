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

// const generateId = (notes) => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

// ROUTES
app.post('/api/notes', (req, res) => {

  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => res.json(savedNote))
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
});

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then(note => {
    res.json(note)
  })
})

app.delete('/api/notes/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  })
})

app.put('/api/notes/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, {new:true}).then((note) => {
    console.log(note)
    res.status(200).json(note)
  })
})
// REQUEST LISTENER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})