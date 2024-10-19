import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const [error, setError] = useState(false);
    const [student, setStudent] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [courses, setCourses] = useState([]);
    const [teachersForCourse, setTeachersForCourse] = useState([]);

    const login = async (email, password, role) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/login', {
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
            const response = await fetch('http://localhost:3000/api/v1/course', {
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



    // const getTeachersForCourse = async (selectedCourseId) => {
    //     const selectedCourse = courses.find(course => course._id === selectedCourseId);
    //     const teacherDetails = [];
    //     if (selectedCourse && selectedCourse.teachers) {
    //         const teacherIds = selectedCourse.teachers;
    //         teacherIds.map(async (id) => {
    //             const teacherName = await fetch(`http://localhost:3000/api/v1/teacher/${id}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             const teacherData = await teacherName.json();
    //             if (!teacherName.ok) {
    //                 console.log("error occured")
    //                 throw new Error(teacherData.error || 'Failed to fetch teacher details');
    //             }
    //             teacherDetails.push(teacherData);
    //         });
    //         setTeachersForCourse(teacherDetails);
    //         console.log(teacherDetails);
    //     } else {
    //         setTeachersForCourse([]); // Clear if no course is selected
    //     }
    // };

    const getTeachersForCourse = async (selectedCourseId) => {
        const selectedCourse = courses.find(course => course._id === selectedCourseId);

        if (selectedCourse && selectedCourse.teachers) {
            const teacherIds = selectedCourse.teachers;

            try {
                // Use Promise.all to fetch all teacher details concurrently
                const teacherDetails = await Promise.all(
                    teacherIds.map(async (id) => {
                        const response = await fetch(`http://localhost:3000/api/v1/teacher/${id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        // Check if the response is ok
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
                console.error("An error occurred:", error); // Handle any errors that occurred in the fetching process
                setTeachersForCourse([]); // Clear teachers if there's an error
            }
        } else {
            setTeachersForCourse([]); // Clear if no course is selected
        }
    };







    return (
        <NoteContext.Provider value={{ login, error, student, teacher, getCourses, courses, getTeachersForCourse, teachersForCourse }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;