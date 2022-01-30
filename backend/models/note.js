const mongoose = require('mongoose')
const {Schema} = mongoose

const url = process.env.MONGO_URL;

console.log('connecting to MongoDB');

mongoose.connect(url)
  .then((result) => {
    console.log('connected to MongoDB', result.connections[0].host);
  })
  .catch((err) => {
    console.log('error connecting to MongoDB: ', err.message)
  })

  const noteSchema = new Schema({
    content: {
      type:String, 
      minLength: 5,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
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