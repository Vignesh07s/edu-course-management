const express = require('express');
const router = express.Router();
const Student = require('../models/student');
// const Course = require('../models/course');
// const auth = require('../middleware/auth');

// Create a new student
router.route("/").post(selectCourse).delete(deleteCourse).patch(updateCourse).get(getCourse);