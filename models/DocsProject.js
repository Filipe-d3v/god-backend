const mongoose = require('../db/conn');
const { Schema } = mongoose;

const DocsProject = mongoose.model(
  'DocsProject',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    doc: {
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

module.exports = DocsProject;