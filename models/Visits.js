const mongoose = require('../db/conn');
const {Schema} = mongoose;

const Visits = mongoose.model(
  'Visits',
  new Schema({
    visitor:{
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    visited:{
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },

  }, {timestamps: true})
);

module.exports = Visits;