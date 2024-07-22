const mongoose = require('../db/conn');

const { Schema } = mongoose;

const News = mongoose.model(
  'News',
  new Schema({
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    source: {
      type: String,
      required: true
    },
    


  }, {timestamps: true})
)

module.exports = News