const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = helper.initialNotes.map(note => new Note(note));
  const promiseArray = noteObjects.map(note => note.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
  }, 10000);

  test('a specific note is within the returned notes', async () => {
    const response = await helper.notesInDb();

    const contents = response.map(r => r.content);
    expect(contents).toContain('Browser can execute only Javascript');
  }, 10000);

});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test('fails with status 4040 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    console.log(validNonexistingId);

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404);
  });
});

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const testUser = {
      username: 'root',
      id:'62034b2ca9cee73fa2a0f8f1',
      password:'sekret'
    };

    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    const loginResponse = await api
      .post('/api/login')
      .send(testUser);

    const token = loginResponse.body.token;
    console.log('token:', token);
    await api
      .post('/api/notes')
      .set('authorization', `bearer ${token}`)
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map(r => r.content);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test('fails with 400 if data invalid', async () => {
    const newNote = {
      important: true
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(401);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map(r => r.content);
    expect(contents).not.toContain(noteToDelete.content);
  });

});
afterAll(done => {
  mongoose.connection.close();
  done();
});