const mongoose = require('../db/conn');

const { Schema } = mongoose;

const Post = mongoose.model(
  'Post',
  new Schema({
    subtitle: {
      type: String,
      required: true
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
      required: true
  },
  date: {
    type: String,
  },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
  }, {timestamps: true})
);

module.exports = Post;