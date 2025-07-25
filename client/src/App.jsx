import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom';
import Home from './pages/students/Home';
import CoursesList from './pages/students/CoursesList.jsx';
import MyEnrollments from './pages/students/MyEnrollments.jsx';
import Player from './pages/students/Player.jsx';
import Loading from './components/students/Loading.jsx';
import Educator from './pages/educator/Educator.jsx';
import AddCourse from './pages/educator/AddCourse.jsx';
import Dashboard from './pages/educator/Dashboard.jsx';
import MyCourses from './pages/educator/MyCourses.jsx';
import StudentsEnrolled from './pages/educator/StudentsEnrolled.jsx';
import Navbar from './components/students/Navbar.jsx';
import CourseDetails from './pages/students/CourseDetails.jsx';
import 'quill/dist/quill.snow.css';

const App = () => {
  const isEducatorRoute = useMatch('/educator/*');
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar />}
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* Educator Nested Routes */}
        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App