import React, {useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function Dropdown({ courses, label, onSelect }) {
    const { getTeachersForCourse, teachersForCourse } = useContext(NoteContext);
    const names = [];
    const onSelectCourse = (courseId) => {
        // console.log(courseId);
        getTeachersForCourse(courseId);
    };
    return (
        <div className="mb-3 d-flex flex-row ">
            <div className='mx-2'>
                <label className="form-label">{label}</label>
                <select className="form-select" onChange={(e) => onSelectCourse(e.target.value)}>
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.name} ({course.code})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="form-label">Select course instructor</label>
                <select className="form-select" onChange={onSelect}>
                    <option value="">Select the course instructor</option>
                    {teachersForCourse.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}  {/* Display teacher's full name */}
                        </option>
                    ))}
                </select>
            </div>


        </div>
    );
}
