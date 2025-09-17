import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import ProjectCRUD from "./components/ProjectCRUD";
import EmployeeCRUD from "./components/EmployeeCRUD";
import AssignEmployee from "./components/AssignEmployee";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Defect Tracker</Link>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/employees">Employees</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/assignments">Assignments</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/projects" element={<ProjectCRUD />} />
          <Route path="/employees" element={<EmployeeCRUD />} />
          <Route path="/assignments" element={<AssignEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
