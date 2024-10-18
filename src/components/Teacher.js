import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function Teacher() {
    const { teacher } = useContext(NoteContext);

    // Handle case when teacher data is not yet available (before login)
    if (!teacher) {
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <p>No teacher data available. Please log in first.</p>
            </div>
        );
    }

    // Destructure teacher data to use in the component
    const { firstName, lastName, email, department, teacherId, dateOfJoining } = teacher;

    const handleAssign = (teacherId) => {
        // Logic to assign teacher to a course
        console.log(`Assigning teacher with ID: ${teacherId}`);
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">Teacher Details</h5>
                    <h6 className="card-subtitle mb-2 text-muted"><strong></strong>{firstName} {lastName}</h6>
                    <p className="card-text"><strong>Email:</strong> {email}</p>
                    <p className="card-text"><strong>Department:</strong> {department}</p>
                    <p className="card-text"><strong>Teacher ID:</strong> {teacherId}</p>
                    <p className="card-text"><strong>Date of Joining:</strong> {new Date(dateOfJoining).toLocaleDateString()}</p>
                    <button className="btn btn-primary" onClick={() => handleAssign(teacherId)}>Assign to Course</button>
                </div>
            </div>
        </div>
    );
}
