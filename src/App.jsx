import Registration from "./pages/registration"
import CourseOffering from './pages/courseOffering'
import {Navbar} from "./navbar"
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Ctec from "./pages/ctec"

function App() {
  return (
 <>
<Navbar/>
  <Routes>
    <Route path = "/" element={<Registration />} />
    <Route path = "/course" element={<CourseOffering />} />
    <Route path = "/ctec" element={<Ctec />} />
  </Routes>
<h6> This submission focuses on backend implementation.</h6>
 </>
  )
}

export default App
