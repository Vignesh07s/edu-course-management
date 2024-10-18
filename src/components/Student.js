import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function Student() {
    const { student } = useContext(NoteContext);

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

    const handleEnroll = (studentId) => {
        // Logic to enroll the student in courses
        console.log(`Enrolling student with ID: ${studentId}`);
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Student Details</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><strong>Name : </strong>{firstName} {lastName}</h6>
                    <p className="card-text"><strong>Email:</strong> {email}</p>
                    <p className="card-text"><strong>Department:</strong> {department}</p>
                    <p className="card-text"><strong>Registration Number:</strong> {regdNumber}</p>
                    <p className="card-text"><strong>Date of Birth:</strong> {new Date(dateOfBirth).toLocaleDateString()}</p>
                    <button className="btn btn-primary" onClick={() => handleEnroll(regdNumber)}>Enroll in Courses</button>
                </div>
            </div>
        </div>
    );
}
