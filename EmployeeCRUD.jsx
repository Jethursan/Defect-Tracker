import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

function EmployeeCRUD() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeCode, setEmployeeCode] = useState(""); // For future login
  const [editId, setEditId] = useState(null);

  const employeeCollectionRef = collection(db, "employees");

  const getEmployees = async () => {
    const data = await getDocs(employeeCollectionRef);
    setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const addEmployee = async () => {
    if (!employeeId || !employeeName || !employeePhone)
      return alert("All fields required");
    await addDoc(employeeCollectionRef, {
      employeeId,
      employeeName,
      employeePhone,
      employeeCode,
    });
    clearForm();
    getEmployees();
  };

  const updateEmployee = async (id) => {
    await updateDoc(doc(db, "employees", id), {
      employeeId,
      employeeName,
      employeePhone,
      employeeCode,
    });
    clearForm();
    setEditId(null);
    getEmployees();
  };

  const deleteEmployee = async (id) => {
    await deleteDoc(doc(db, "employees", id));
    getEmployees();
  };

  const clearForm = () => {
    setEmployeeId("");
    setEmployeeName("");
    setEmployeePhone("");
    setEmployeeCode("");
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">{editId ? "Update Employee" : "Add New Employee"}</h4>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Employee Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={employeePhone}
              onChange={(e) => setEmployeePhone(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="password"
              className="form-control"
              placeholder="Login Code"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3">
          {editId ? (
            <button
              className="btn btn-primary me-2"
              onClick={() => updateEmployee(editId)}
            >
              Update
            </button>
          ) : (
            <button className="btn btn-success me-2" onClick={addEmployee}>
              Add
            </button>
          )}
          <button className="btn btn-secondary" onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-striped table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employeeId}</td>
              <td>{emp.employeeName}</td>
              <td>{emp.employeePhone}</td>
              <td>{emp.employeeCode}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditId(emp.id);
                    setEmployeeId(emp.employeeId);
                    setEmployeeName(emp.employeeName);
                    setEmployeePhone(emp.employeePhone);
                    setEmployeeCode(emp.employeeCode);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeCRUD;
