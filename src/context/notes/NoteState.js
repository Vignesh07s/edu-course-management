import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const [error,setError] = useState(false);
    const [student, setStudent] = useState(null);
    const [teacher, setTeacher] = useState(null);
    
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



    

    return (
        <NoteContext.Provider value={{login,error,student, teacher}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;