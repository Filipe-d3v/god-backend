const mongoose = require('../db/conn');
 const {Schema} = mongoose;

 const Response = mongoose.model(
  'Response',
  new Schema({
    text: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: false
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    question: {
      type: mongoose.Types.ObjectId,
      ref: 'Question'
    }
  }, {timestamps: true})
 )

 module.exports = Response;