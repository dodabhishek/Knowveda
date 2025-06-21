import React from 'react'
import EducatorNavbar from '../../components/educator/Navbar'

const Educator = () => {
  return (
    <div>
      <EducatorNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Educator Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <p className="text-gray-600 mb-4">View your teaching analytics</p>
            <a href="/educator/dashboard" className="text-blue-600 hover:text-blue-800">Go to Dashboard →</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Course</h2>
            <p className="text-gray-600 mb-4">Create a new course</p>
            <a href="/educator/add-course" className="text-blue-600 hover:text-blue-800">Add Course →</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            <p className="text-gray-600 mb-4">Manage your existing courses</p>
            <a href="/educator/my-courses" className="text-blue-600 hover:text-blue-800">View Courses →</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Educator