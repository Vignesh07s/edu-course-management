const express = require('express');
const router = express.Router();
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/course');

// Create a new course
router.post("/", createCourse);

// Get all courses
router.get("/", getCourses);

// Update a specific course by ID
router.patch("/:id", updateCourse);

// Remove a specific course by ID
router.delete("/:id", deleteCourse);

module.exports = router;