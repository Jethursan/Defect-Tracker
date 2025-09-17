import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AssignEmployee() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [role, setRole] = useState("Frontend");
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projData = await getDocs(collection(db, "projects"));
      setProjects(projData.docs.map((d) => ({ ...d.data(), id: d.id })));

      const empData = await getDocs(collection(db, "employees"));
      setEmployees(empData.docs.map((d) => ({ ...d.data(), id: d.id })));

      const assignData = await getDocs(collection(db, "assignments"));
      setAssignments(assignData.docs.map((d) => ({ ...d.data(), id: d.id })));
    };
    fetchData();
  }, []);

  const assign = async () => {
    if (!selectedProject || !selectedEmployee) return alert("Select project & employee");

    await addDoc(collection(db, "assignments"), {
      projectId: selectedProject,
      employeeId: selectedEmployee,
      role,
    });

    alert("Employee Assigned!");
    setSelectedProject("");
    setSelectedEmployee("");
    setRole("Frontend");
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">Assign Employee to Project</h4>
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.projectId}>
                  {p.projectId} - {p.projectName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.employeeId}>
                  {emp.employeeId} - {emp.employeeName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
            </select>
          </div>
        </div>

        <button className="btn btn-success" onClick={assign}>
          Assign Employee
        </button>
      </div>

      <h5>Assigned Employees</h5>
      <table className="table table-bordered table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Project</th>
            <th>Employee</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => {
            const project = projects.find((p) => p.projectId === a.projectId);
            const employee = employees.find((e) => e.employeeId === a.employeeId);
            return (
              <tr key={index}>
                <td>{project ? project.projectName : a.projectId}</td>
                <td>{employee ? employee.employeeName : a.employeeId}</td>
                <td>{a.role}</td>
              </tr>
            );
          })}
          {assignments.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No assignments yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssignEmployee;
