const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    creditHours: {
        type: Number,
        required: true
    },
    skillDevelopmentCourse: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);