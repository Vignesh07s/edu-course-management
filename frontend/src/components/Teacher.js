import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function Teacher() {
    const { teacher } = useContext(NoteContext); // Assuming you have a teacher context
    const [flag, setFlag] = useState(false);

    // Handle case when teacher data is not yet available (before login)
    if (!teacher) {
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <p>No teacher data available. Please log in first.</p>
            </div>
        );
    }

    // Destructure teacher data to use in the component
    const { firstName, lastName, email, department, employeeId, dateOfJoining } = teacher;

    const handleEnroll = () => {
        setFlag(!flag);
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card" style={{ width: '100%' }}>
                <div className="card-body">
                    <div className='text-center'>
                        <h5 className="card-title">Teacher Details</h5>
                    </div>
                    <h6 className="card-subtitle mb-2">
                        <strong>Name: </strong>{firstName} {lastName}
                    </h6>
                    <p className="card-text"><strong>Email:</strong> {email}</p>
                    <p className="card-text"><strong>Department:</strong> {department}</p>
                    <p className="card-text"><strong>Employee ID:</strong> {employeeId}</p>
                    <p className="card-text"><strong>Date of Joining:</strong> {new Date(dateOfJoining).toLocaleDateString()}</p>
                    <button className="btn btn-primary" onClick={handleEnroll}>Enroll in Courses</button>
                </div>
            </div>
            {flag && (
                <div className="mt-3">
                    {/* Add your course selection options here */}
                    <h6>Select Courses:</h6>
                    <ul>
                        {/* Example course options */}
                        <li><input type="checkbox" /> Course 1</li>
                        <li><input type="checkbox" /> Course 2</li>
                        <li><input type="checkbox" /> Lab 1</li>
                        <li><input type="checkbox" /> Lab 2</li>
                        {/* Add more course options as needed */}
                    </ul>
                </div>
            )}
        </div>
    );
}
