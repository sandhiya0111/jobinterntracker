import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <span className="logo-icon">J</span>

        <span>
          Job<span className="logo-highlight">Track</span>
        </span>
      </Link>

      <div className="nav-links">

        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/jobs/type/Job">
          Jobs
        </NavLink>

        <NavLink to="/jobs/type/Internship">
          Internships
        </NavLink>

        <NavLink to="/jobs">
          Applications
        </NavLink>

        <NavLink to="/login">
          Login
        </NavLink>

        <Link to="/add-job" className="nav-add-button">
          + Add Application
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
