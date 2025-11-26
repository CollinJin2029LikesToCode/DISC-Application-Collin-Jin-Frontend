import {CourseItem} from "./courseItem"
export function CourseList({course, registerCourse, deleteCourse}){
    return(
        <ul className="list">
        {course.length == 0 && (
        <h3 >
          No Courses Added. <br /> 
          Your CS Advisor is very angry. <br /> 
          Professor Sara Sood is on her way.
        </h3>
      )}
        {course.map(course => {
          return (
        
          <CourseItem id={course.id} completed={course.compelted} title={course.title} registerCourse ={registerCourse} deleteCourse={deleteCourse} key={course.id}/>
          )
        })}
      </ul>
    )
}