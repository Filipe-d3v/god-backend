const mongoose = require('../db/conn');
const {Schema} = mongoose;

const Project = mongoose.model(
    'Project',
    new Schema({
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: false
        },
        docs: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        desc: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: false
        },
        projectSkills: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Skill'
        }],
        images: [{
            type: Array,
            required: false,
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            default: 0
        },
    },
    {timestamps: true},
));

module.exports = Project;