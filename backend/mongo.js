const mongoose = require('mongoose');
const { Schema } = mongoose;

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://zenlex:${password}@cluster0.oofub.mongodb.net/fso-notesapp?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new Schema({
  content: String, 
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true
// })

// note.save().then(result => {
//   console.log('note saved')
//   mongoose.connection.close()
// })

//POPULATE NOTES WITH DUMMY DATA
// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ];
// notes.forEach(note => {
//   Note.create({ content: note.content, date: note.date, important: note.important })
// })

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//     mongoose.connection.close();
//   })
// })