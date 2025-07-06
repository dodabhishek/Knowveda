import { createContext, useEffect, useState } from "react"; 
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

     const currency = import.meta.env.VITE_CURRENCY ;
    const navigate = useNavigate();
    const { user } = useUser();
    const [allCourses,setAllCourses] = useState([]);
    const [isEducator,setIsEducator] = useState(true);
    const [enrolledCourses,setEnrolledCoures] = useState([]);

     useEffect(()=>{
        fetchAllCourses();
        fetchEnrolledCourses();
    },[])

    // Sync user with backend when user signs in
    useEffect(() => {
        if (user) {
            syncUserWithBackend();
        }
    }, [user]);

    // Function to sync user data with backend
    const syncUserWithBackend = async () => {
        try {
            const userData = {
                _id: user.id,
                email: user.emailAddresses[0]?.emailAddress,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                imageUrl: user.imageUrl,
            };

            const response = await axios.post('http://localhost:3000/api/users/sync', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('User synced with backend successfully');
            } else {
                console.error('Failed to sync user with backend');
            }
        } catch (error) {
            console.error('Error syncing user with backend:', error.response?.data || error.message);
        }
    };

    // function to calculate course chapter time
    const calculateChapterTime = (chapter)=>{
      let time = 0;
      chapter.chapterContent.map((lecture)=>{
          time+=lecture.lectureDuration 
      })

      return humanizeDuration(time*60*100,{units:['h','m']});
    }

    // function to calculate course duration 
    const calculateCourseDuration = (course)=>{
      let time = 0;
      course.courseContent.map((chapter)=>{
        chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration)
      })
       return humanizeDuration(time*60*100,{units:['h','m']});
    }

    // function to calculate total no of lectures
    const calculateNoOfLectures = (course)=>{
      let totalLectures = 0;
      course.courseContent.forEach(chapter=>{
        if(Array.isArray(chapter.chapterContent)){
          totalLectures+=chapter.chapterContent.length
        }
      });
      return totalLectures ;
    } 
 

    // fetch user enrolled courses
    const fetchEnrolledCourses = async()=>{
     
      setEnrolledCoures(dummyCourses);
    }

    //Fetch all courses
    const fetchAllCourses = async ()=>{
      setAllCourses(dummyCourses);
    }

    // Function to calculate average rating of courses
    const  calculateRating = (course)=>{
      if(course.courseRatings.length === 0) return 0;
      let totalRating = 0;
      course.courseRatings.forEach(rating => {
        totalRating+=rating.rating ;
      })

      return totalRating / course.courseRatings.length;
    }

 
  const value =    {
    currency ,allCourses,navigate,calculateRating,enrolledCourses,
    isEducator,setIsEducator,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures
  }

  return (
            <AppContext.Provider value={value}>
                {props.children}
            </AppContext.Provider>
    )
}