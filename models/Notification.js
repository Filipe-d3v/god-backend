const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Notification = mongoose.model(
  'Notification',
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
      required: false,
      ref: 'Project'
    }
  }, {timestamps: true})
);

module.exports = Notification;