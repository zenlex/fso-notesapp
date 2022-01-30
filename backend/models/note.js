const mongoose = require('mongoose')
const {Schema} = mongoose

const url = process.env.MONGO_URL;

<<<<<<< HEAD
console.log('connecting to MongoDB');

mongoose.connect(url)
  .then((result) => {
    console.log('connected to MongoDB', result.connections[0].host);
=======
console.log('connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
>>>>>>> main
  })
  .catch((err) => {
    console.log('error connecting to MongoDB: ', err.message)
  })

  const noteSchema = new Schema({
    content: String, 
    date: Date,
    important: Boolean,
  });
  
  noteSchema.set('toJSON', {
    transform: (document, returnedObj) => {
      returnedObj.id = returnedObj._id.toString()
      delete returnedObj._id
      delete returnedObj.__v
    }
  })

  module.exports = mongoose.model('Note', noteSchema);