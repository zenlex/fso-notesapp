const notesRouter = require('express').Router();
const Note = require('../models/note');


// ROUTES
notesRouter.get('/', async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

notesRouter.get('/:id', async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  try {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

notesRouter.post('/', async (req, res, next) => {
  const body = req.body;
  try {
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote.toJSON());
  } catch (err) {
    next(err);
  }
});

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

notesRouter.put('/:id', async (req, res, next) => {
  const originalNote = {
    content: req.body.content,
    important: req.body.important
  };
  try {
    const updatedNote = await Note
      .findByIdAndUpdate(req.params.id, originalNote, { new: true });
    res.json(updatedNote);
  }catch(err){
    next(err);
  }
});

module.exports = notesRouter;
