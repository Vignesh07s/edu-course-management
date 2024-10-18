const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    staffID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        enum: ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics and Communication', 'Chemical', 'Aeronautical'],
        trim: true
    },
    DateOfJoining: {
        type: Date,
        default: Date.now
    },
    coursesTaught: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    address: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true }
    },
    experience: {
        type: Number,
        default: 0,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Rather not say'],
        required: true
    },
    password: {
        type: String,
        required: true,
        default: function () {
            return this.staffID;
        }
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);
