const mongoose = require('../db/conn');
const {Schema} = mongoose;

const Assessment = mongoose.model(
  'Assessment',
  new Schema({
    rating: {
      type: Number,
      required: true,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, {timestamps: true})
);

module.exports = Assessment;