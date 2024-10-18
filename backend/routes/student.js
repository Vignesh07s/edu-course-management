const express = require('express');
const router = express.Router();
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    updateStudentCourses
} = require('../controllers/student');

// Create a new student
router.post('/', createStudent);

// Get all students
router.get('/', getAllStudents);

// Get a specific student by ID
router.get('/:id', getStudentById);

// Update a specific student by ID
router.patch('/:id', updateStudent);

// Delete a specific student by ID
router.delete('/:id', deleteStudent);

//
router.put('/:id/courses', updateStudentCourses);

module.exports = router;
