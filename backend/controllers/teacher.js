const Teacher = require('../models/teacher');
const Course = require('../models/course'); // Ensure you have the Course model imported

const updateCoursesForTeacher = async (teacherId, coursesTaught) => {
    for (let courseId of coursesTaught) {
        let course = await Course.findById(courseId);

        if (!course) {
            throw new Error(`Course with ID ${courseId} not found`);
        }

        // Add the teacher to the course if not already there
        if (!course.teachers.includes(teacherId)) {
            course.teachers.push(teacherId);
        }
        await course.save();
    }
};

// Create a new teacher
const createTeacher = async (req, res) => {
    const { firstName, lastName,staffID,  email, phoneNumber, department, coursesTaught, address, experience, gender } = req.body;

    try {
        const teacher = new Teacher({
            firstName,
            lastName,
            staffID,
            email,
            phoneNumber,
            department,
            address,
            experience,
            gender
        });

        // Save the teacher first
        await teacher.save();

        // Update the courses with the teacher reference
        await updateCoursesForTeacher(teacher._id, coursesTaught);

        // Assign courses to the teacher
        teacher.coursesTaught = coursesTaught;
        await teacher.save();

        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific teacher by ID
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a specific teacher by ID
const updateTeacher = async (req, res) => {
    const { coursesTaught, ...teacherData } = req.body;

    try {
        // Update the teacher's basic information
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, teacherData, { new: true, runValidators: true });
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Check if coursesTaught is provided and is an array before updating
        if (Array.isArray(coursesTaught)) {
            // Update the teacher's courses
            await updateCoursesForTeacher(teacher._id, coursesTaught);

            // Update the teacher's courses in the teacher object
            teacher.coursesTaught = coursesTaught;
        }

        // Save the updated teacher object
        await teacher.save();

        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Remove a specific teacher by ID
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Remove the teacher from all associated courses
        await Course.updateMany(
            { teachers: teacher._id },
            { $pull: { teachers: teacher._id } }
        );

        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTeacher,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};