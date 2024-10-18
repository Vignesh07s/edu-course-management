const express = require('express');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const router = express.Router();

// Login endpoint
router.post('/', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;

        // Determine the model to query based on the role
        if (role === 'student') {
            user = await Student.findOne({ email });
        } else if (role === 'teacher') {
            user = await Teacher.findOne({ email });
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }

        // Check if user was found
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json(user);
    } catch (error) {
        console.error('Server error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;