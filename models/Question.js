const mongoose = require('../db/conn')
const {Schema} = mongoose;

const Question = mongoose.model(
  'Question',
  new Schema({
    text: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    response: {
      type: Schema.Types.ObjectId,
    },
    owner: Object,
    
  }, {timestamps: true})
)
module.exports = Question