import {useState, useEffect} from 'react'
import {CourseForm} from "./courseForm"
import {CourseList} from './courseList'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
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
      <h1 className="header">FAKE NORTHWESTERN CAESAR BY COLLIN</h1>
      <h3> I used useState to update and maintain the course list</h3>
      <h3> I used useEffect to maintain a local storage of the course list</h3>
      <CourseForm submitCourse={addCourse}/>
      <h1 className="header">Your Classes</h1>
      <CourseList course={courseList} registerCourse={registerCourse} deleteCourse={deleteCourse}/>
    </>
  )
}

export default App
