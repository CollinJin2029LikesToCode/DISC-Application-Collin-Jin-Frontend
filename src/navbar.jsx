import { Link } from "react-router-dom"
export function Navbar() {
  return (
    <nav className="nu-navbar">
      <div className="nu-brand">
        <strong>Northwestern</strong> <br/> FAKE CAESAR
      </div>
      <ul className="nu-nav-links">
        <li>
          <Link to="/">Registration</Link>
        </li>
        <li>
          <Link to="/course">Offering</Link>
        </li>
        <li>
          <Link to="/ctec">CTEC</Link>
        </li>
      </ul>
    </nav>
  )
}