import React from 'react'
import Hero from '../../components/students/Hero.jsx';
import Companies from '../../components/students/Companies.jsx';
import CourseSection from '../../components/students/CourseSection.jsx';
import Testimonial from '../../components/students/Testimonial.jsx';
import CallToAction from '../../components/students/CallToAction.jsx';
import Footer from '../../components/students/Footer.jsx';
const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
     <Hero />
     <Companies />
     <CourseSection />
     <Testimonial />
     <CallToAction />
     <Footer />
    </div>
    
  )
}

export default Home