const mongoose = require('../db/conn')
const { Schema } = mongoose

const Skill = mongoose.model(
    'Skill',
    new Schema({
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
    )
)

module.exports = Skill