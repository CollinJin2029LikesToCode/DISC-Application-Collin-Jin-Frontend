import { useState, useEffect } from 'react'
import '../App.css'
import './courseOffering.css'

function CourseOffering() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    course_code: '',
    title: '',
    instructor: '',
    description: '',
    difficulty_rating: '', 
    credits: ''
  })

  useEffect(() => {
    fetchCourses();
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3008/curriculum');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError("Could not load courses.");
    } finally {
      setLoading(false);
    }
  }

  const handleAddCourse = async (e) => {
    e.preventDefault(); 
    
    const payload = {
      ...formData,
      difficulty_rating: formData.difficulty_rating === '' ? null : parseFloat(formData.difficulty_rating),
      credits: formData.credits === '' ? 1.0 : parseFloat(formData.credits)
    };

    try {
      const response = await fetch('http://localhost:3008/curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) 
      });

      if (response.ok) {
        const newCourse = await response.json();
        setCourses([newCourse, ...courses]);
        
        setFormData({
          course_code: '', 
          title: '', 
          instructor: '', 
          description: '', 
          difficulty_rating: '', 
          credits: ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this course?")) return;

    try {
      const response = await fetch(`http://localhost:3008/curriculum/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2 style={{color: 'red'}}>{error}</h2>

  return (
    <div className="offering-page">
      <h1 className="header">Northwestern CS Course Catalog</h1>
      <div className="admin-panel">
        <h3>Add New Course to Database</h3>
        <form onSubmit={handleAddCourse} className="course-form">
          <input 
            className="form-input"
            type="text" name="course_code" placeholder="Course Code (e.g. COMP_SCI 111)" 
            value={formData.course_code} onChange={handleChange} required 
          />
          <input 
            className="form-input"
            type="text" name="title" placeholder="Course Title" 
            value={formData.title} onChange={handleChange} required 
          />
          <input 
            className="form-input"
            type="text" name="instructor" placeholder="Instructor Name" 
            value={formData.instructor} onChange={handleChange} 
          />
          <textarea 
            className="form-input"
            name="description" placeholder="Description" 
            value={formData.description} onChange={handleChange}
          />
          <div className="form-row">
             <input 
              className="form-input-half"
              type="number" name="difficulty_rating" placeholder="Difficulty" 
              step="0.1" min="0" max="5"
              value={formData.difficulty_rating} onChange={handleChange}
            />
             <input 
              className="form-input-half"
              type="number" name="credits" placeholder="Credits" 
              step="0.01"
              value={formData.credits} onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-submit">
            Add to Catalog
          </button>
        </form>
      </div>

      <div className="course-list-container">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3 className="card-title">{course.course_code}: {course.title}</h3>
            <p className="card-instructor">Instructor: {course.instructor}</p>
            <p className="card-description">{course.description}</p>
            <div className="card-footer">
                <span>Credits: {course.credits}</span>
                <span>Difficulty: {course.difficulty_rating || 'N/A'}/5.0</span>
                <button 
                className="btn-delete"
                onClick={() => handleDelete(course.id)}>
                DELETE
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseOffering