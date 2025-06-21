import React from 'react'
import { Routes,Route, useMatch } from 'react-router-dom';
import Home from './pages/students/Home';
import CoursesList from './pages/students/CoursesList.jsx';
import CourseDetails from './pages/students/CourseDetails.jsx';
import MyEnrollments from './pages/students/MyEnrollments.jsx';
import Player from './pages/students/Player.jsx';
import Loading from './components/students/Loading.jsx';
import Educator from './pages/educator/Educator.jsx';
import AddCourse from './pages/educator/AddCourse.jsx';
import Dashboard from './pages/educator/Dashboard.jsx';
import MyCourses from './pages/educator/MyCourses.jsx';
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx';
import Navbar from './components/students/Navbar.jsx';


const App = () => {
  const isEduactorRoute = useMatch('/educator/*');
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEduactorRoute && <Navbar />}
      
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Player />} />

        <Route path='/educator' element= {<Educator />}></Route>
              <Route path="add-course" element={<AddCourse />} />
              <Route path="educator" element={<Dashboard />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="student-enrolled" element={<StudentsEnrolled />} />
      </Routes>
    </div>
  )
}

export default App