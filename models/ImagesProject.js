const mongoose = require('../db/conn');
const { Schema } = mongoose;

const ImagesProject = mongoose.model(
  'ImagesProject',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ofproject: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    }
  }, { timestamps: true })
);

module.exports = ImagesProject;