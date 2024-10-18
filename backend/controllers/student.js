const Student = require('../models/student');

const updateStudentCourses = async (req, res) => {
    const { coursesEnrolled } = req.body; // Expecting an array of { courseId, teacherId }

    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Update the student's coursesEnrolled
        student.coursesEnrolled = coursesEnrolled;
        await student.save();

        res.status(200).json({ message: 'Courses and teachers updated successfully', student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Create a new student
const createStudent = async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json({ newStudent });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        // const students = await Student.find().populate('coursesEnrolled');
        const students = await Student.find({});
        res.status(200).json({ students, studentsCount: students.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific student by ID
const getStudentById = async (req, res) => {
    try {
        // const student = await Student.findById(req.params.id).populate('coursesEnrolled');
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateStudent = async (req, res) => {
    const { coursesEnrolled, ...studentData } = req.body; // Exclude coursesEnrolled from update

    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, studentData, { new: true, runValidators: true });
        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ updatedStudent });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific student by ID
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    updateStudentCourses
};
