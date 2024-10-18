const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    regdNumber: {
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
    yearOfStudy: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4],  // Representing 1st, 2nd, 3rd, 4th years
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Rather not say'],
        required: true
    },
    address: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true }
    },
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    // dateOfAdmission: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = mongoose.model('Student', studentSchema);
