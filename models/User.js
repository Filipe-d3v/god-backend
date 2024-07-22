const mongoose = require('../db/conn')

const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        xp: {
            type: Number,
            default: 0,
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: false
        },
        birth: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        skills: {
            type: Array,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        linkedin: {
            type: String,
            required: false
        },
        github: {
            type: String,
            required: false
        },
    },
    {timestamps: true}
    )
)

module.exports = User