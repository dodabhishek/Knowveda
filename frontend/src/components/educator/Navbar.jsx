import React from 'react'
import { Link } from 'react-router-dom'

const EducatorNavbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/educator" className="text-xl font-bold text-white">
              Educator Portal
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/educator/dashboard" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/educator/add-course" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Add Course
            </Link>
            <Link to="/educator/my-courses" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              My Courses
            </Link>
            <Link to="/educator/students-enrolled" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Students
            </Link>
            <Link to="/" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default EducatorNavbar
