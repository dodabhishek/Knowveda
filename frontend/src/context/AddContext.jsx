import { createContext, useEffect, useState } from "react"; 
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';
export const AppContext = createContext();

export const AppContextProvider = (props) => {

     const currency = import.meta.env.VITE_CURRENCY ;
    const navigate = useNavigate();
    const [allCourses,setAllCourses] = useState([]);
    const [isEducator,setIsEducator] = useState(true);
    const [enrolledCourses,setEnrolledCoures] = useState([]);

     useEffect(()=>{
        fetchAllCourses();
        fetchEnrolledCourses();

    },[])

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