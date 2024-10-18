import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

export default function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { role } = location.state || { role: 'Guest' };
    const { login, error } = useContext(NoteContext);

    // Local state for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(email, password, role);
            if (!error) {
                if (role === 'student') {
                    navigate('/student'); 
                } else if (role === 'teacher') {
                    navigate('/teacher');
                }
            }
        } catch (error) {

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <h1>Login as {role}</h1>
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Capture email input
                    required
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="passwd" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="passwd"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Capture password input
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            {error && <p style={{ color: 'red' }}>An error occured during login</p>}
        </form>
    );
}
