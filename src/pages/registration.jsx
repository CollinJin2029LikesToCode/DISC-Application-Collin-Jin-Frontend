import {useState, useEffect} from 'react'
import {CourseForm} from "../courseForm"
import {CourseList} from '../courseList'
import '../App.css'

function Registration() {
  
  const [courseList, setCourseList] = useState(() => {
    const localCourse = localStorage.getItem("ITEMS")
    if (localCourse == null) return []
    return JSON.parse(localCourse)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(courseList))
  },[courseList])

  function addCourse(title){
    setCourseList((currentCourseList) => {
      return [
        ...currentCourseList,
        {id:crypto.randomUUID(),
          title,
          completed: false
        },
      ]
    })
  }
  function registerCourse(id,completed){
    setCourseList(currentCourseList => {
      return currentCourseList.map(course => {
        if(course.id == id){
          return {...course, completed}
        }
        return course
      })
    })
  }
  function deleteCourse(id){
    setCourseList(currentCourseList => {
      return currentCourseList.filter(course => course.id != id)
    })
  }
  return (
    <>
      <h1 className="header">FAKE NORTHWESTERN CAESAR WITH SUPABASE BY COLLIN</h1>
      <h2 className="header">This page doesn't contain backend integration,
        please proceed to course offering page</h2>
      <CourseForm submitCourse={addCourse}/>
      <h1 className="header">Your Classes</h1>
      <CourseList course={courseList} registerCourse={registerCourse} deleteCourse={deleteCourse}/>
    </>
  )
}

export default Registration
