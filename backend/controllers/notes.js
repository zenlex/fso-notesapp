const notesRouter = require('express').Router()
const Note = require('../models/note');


// ROUTES
notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
});

notesRouter.get('/:id', (req, res, next) => {
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

notesRouter.post('/', (req, res, next) => {
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

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end();
  })
  .catch(err => next(err))
})

notesRouter.put('/:id', (req, res, next) => {
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

module.exports = notesRouter;
