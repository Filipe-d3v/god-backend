const mongoose = require('../db/conn');
const {Schema} = mongoose;

const FeedBack = mongoose.model(
    'FeedBack',
    new Schema({
        rating: {
            type: Number,
            required: true
        },
        date: {
            type: String
        },
        project: {
            type: mongoose.Types.ObjectId,
            ref: 'Project',
            required: true
        },
    },
    {timestamps: true},
    )
)

module.exports = FeedBack;