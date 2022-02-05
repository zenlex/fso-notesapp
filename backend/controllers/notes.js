const notesRouter = require('express').Router();
const Note = require('../models/note');


// ROUTES
notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
});

notesRouter.post('/', async (req, res) => {
  const body = req.body;
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote.toJSON());
});

notesRouter.delete('/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

notesRouter.put('/:id', async (req, res) => {
  const originalNote = {
    content: req.body.content,
    important: req.body.important
  };
    const updatedNote = await Note
      .findByIdAndUpdate(req.params.id, originalNote, { new: true });
    res.json(updatedNote);
});

module.exports = notesRouter;
