const mongoose = require('../db/conn');
const {Schema} = mongoose;

const Phone = mongoose.model(
  'Phone',
  new Schema({
    country: {
      type: Number,
      required: true
    },
    ddd: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },{timestamps: true})
);

module.exports = Phone;