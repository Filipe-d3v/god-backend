const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Address = mongoose.model(
  'Address',
  new Schema({
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    postalcode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true
    },
    uf: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }, { timestamps: true })
);

module.exports = Address;