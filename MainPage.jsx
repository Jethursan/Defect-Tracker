import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to Defect Tracker Admin</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h5 className="card-title">Projects</h5>
              <p className="card-text">Manage all projects and their details</p>
              <Link to="/projects" className="btn btn-primary">
                Go to Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h5 className="card-title">Employees</h5>
              <p className="card-text">Manage employee details and assign codes</p>
              <Link to="/employees" className="btn btn-success">
                Go to Employees
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-body text-center">
              <h5 className="card-title">Assignments</h5>
              <p className="card-text">Assign employees to projects with roles</p>
              <Link to="/assignments" className="btn btn-warning">
                Go to Assignments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
