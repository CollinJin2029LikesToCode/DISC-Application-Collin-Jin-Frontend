export function CourseItem({completed, id, title, registerCourse,deleteCourse }){
    return(
        <li>
          <label>
          <input type="checkbox" checked={completed}
          onChange={e => registerCourse(id, e.target.checked)}/>
          {title}
        </label>
        <button onClick={() => deleteCourse(id)} className="btn btn-danger">DELETE</button>
        </li>
    )
}