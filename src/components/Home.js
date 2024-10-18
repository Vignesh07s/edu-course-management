import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = () => {
    if (role) {
      navigate('/login', { state: { role } });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Are you a...</h1>
        <select
          className="form-select mt-3"
          aria-label="Role Selection"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
