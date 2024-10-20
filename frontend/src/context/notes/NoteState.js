import NoteContext from './NoteContext';
import { useState } from 'react';
const url = "https://edu-course-management.onrender.com"

const NoteState = (props) => {
    const [error, setError] = useState(false);
    const [student, setStudent] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [courses, setCourses] = useState([]);
    const [teachersForCourse, setTeachersForCourse] = useState([]);

    const login = async (email, password, role) => {
        try {
            const response = await fetch(`${url}/api/v1/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(true);
                throw new Error(data.error || 'Login failed');
            }
            if (role === 'teacher') setTeacher(data);
            else if (role === 'student') setStudent(data);
            console.log("Logged in user:", data);

        } catch (err) {
            console.error(err);
            setError(true);
        }
    };


    const getCourses = async () => {
        try {
            const response = await fetch(`${url}/api/v1/course`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch courses');
            }

            setCourses(data);

        } catch (err) {
            console.error(err);
            setError(true);
        }
    };

    const getTeachersForCourse = async (selectedCourseId) => {
        const selectedCourse = courses.find(course => course._id === selectedCourseId);

        if (selectedCourse && selectedCourse.teachers) {
            const teacherIds = selectedCourse.teachers;

            try {
                const teacherDetails = await Promise.all(
                    teacherIds.map(async (id) => {
                        const response = await fetch(`${url}/api/v1/teacher/${id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error("Error occurred while fetching teacher:", errorData.error || 'Failed to fetch teacher details');
                            throw new Error(errorData.error || 'Failed to fetch teacher details');
                        }

                        const teacherData = await response.json();
                        return {
                            id: teacherData._id,
                            name: `${teacherData.firstName} ${teacherData.lastName}`
                        };
                    })
                );

                setTeachersForCourse(teacherDetails);
            } catch (error) {
                console.error("An error occurred:", error);
                setTeachersForCourse([]);
            }
        } else {
            setTeachersForCourse([]);
        }
    };







    return (
        <NoteContext.Provider value={{ login, error, student, teacher, getCourses, courses, getTeachersForCourse, teachersForCourse }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;