import './App.css';
import Login from './components/Login';
import Student from './components/Student';
import Teacher from './components/Teacher';
// import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import NotFound from './components/NotFound';
import Home from './components/Home';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student" element={<Student />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
