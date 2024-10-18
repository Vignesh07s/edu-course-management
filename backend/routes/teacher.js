const express = require('express');
const router = express.Router();
const {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
} = require('../controllers/teacher');

// Create a new teacher
router.post('/', createTeacher);

// Get all teachers
router.get('/', getTeachers);

// Get a specific teacher by ID
router.get('/:id', getTeacherById);

// Update a specific teacher by ID
router.patch('/:id', updateTeacher);

// Remove a specific teacher by ID
router.delete('/:id', deleteTeacher);

module.exports = router;
