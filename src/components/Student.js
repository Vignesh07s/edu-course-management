import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Dropdown from './Dropdown'; // Adjust the import according to your file structure

export default function Student() {
    const { student, getCourses, courses } = useContext(NoteContext);
    const [flag, setFlag] = useState(false);
    
    // State for selected courses
    const [theoryCourse1, setTheoryCourse1] = useState('');
    const [theoryCourse2, setTheoryCourse2] = useState('');
    const [theoryCourse3, setTheoryCourse3] = useState('');
    const [theoryCourse4, setTheoryCourse4] = useState('');
    const [labCourse1, setLabCourse1] = useState('');
    const [labCourse2, setLabCourse2] = useState('');

    // Handle case when student data is not yet available (before login)
    if (!student) {
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <p>No student data available. Please log in first.</p>
            </div>
        );
    }

    // Destructure student data to use in the component
    const { firstName, lastName, email, department, regdNumber, dateOfBirth } = student;

    const handleEnroll = async () => {
        
        await getCourses(); // Fetch courses on enroll button click
        setFlag(!flag);
        // console.log(courses);
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card" style={{ width: '100%' }}>
                <div className="card-body">
                    <div className='text-center'>
                        <h5 className="card-title">Student Details</h5>
                    </div>
                    <h6 className="card-subtitle mb-2"><strong>Name: </strong>{firstName} {lastName}</h6>
                    <p className="card-text"><strong>Email:</strong> {email}</p>
                    <p className="card-text"><strong>Department:</strong> {department}</p>
                    <p className="card-text"><strong>Registration Number:</strong> {regdNumber}</p>
                    <p className="card-text"><strong>Date of Birth:</strong> {new Date(dateOfBirth).toLocaleDateString()}</p>
                    <button className="btn btn-primary" onClick={handleEnroll}>Enroll in Courses</button>
                </div>
            </div>
            {flag && (
                <div className="mt-3">
                    <h6>Select Theory Courses</h6>
                    <Dropdown courses={courses} label="Theory Course 1" onSelect={(e) => setTheoryCourse1(e.target.value)} />
                    <Dropdown courses={courses} label="Theory Course 2" onSelect={(e) => setTheoryCourse2(e.target.value)} />
                    <Dropdown courses={courses} label="Theory Course 3" onSelect={(e) => setTheoryCourse3(e.target.value)} />
                    <Dropdown courses={courses} label="Theory Course 4" onSelect={(e) => setTheoryCourse4(e.target.value)} />
                    <h6>Select Lab Courses</h6>
                    <Dropdown courses={courses} label="Lab Course 1" onSelect={(e) => setLabCourse1(e.target.value)} />
                    <Dropdown courses={courses} label="Lab Course 2" onSelect={(e) => setLabCourse2(e.target.value)} />
                </div>
            )}
        </div>
    );
}
