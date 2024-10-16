const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Comment = mongoose.model(
  'Comment',
  new Schema({
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    about: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Project'
    }
  }, {timestamps: true})
);

module.exports = Comment;