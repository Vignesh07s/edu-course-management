const Course = require('../models/course');

const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).send({ course });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).send({ courses });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params; // Get the course ID from the request parameters
    try {
        const course = await Course.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the updates
        });

        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }

        res.status(200).send({ course });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


const deleteCourse = async (req, res) => {
    const { id } = req.params; // Get the course ID from the request parameters
    try {
        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {createCourse, getCourses, updateCourse, deleteCourse};