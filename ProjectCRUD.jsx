import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ProjectCRUD() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [editId, setEditId] = useState(null);

  const projectsCollectionRef = collection(db, "projects");

  const getProjects = async () => {
    const data = await getDocs(projectsCollectionRef);
    setProjects(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => { getProjects(); }, []);

  const addProject = async () => {
    if (!projectId || !projectName) return alert("Project ID & Name required");
    await addDoc(projectsCollectionRef, { projectId, projectName, projectDescription, projectDuration });
    clearForm(); getProjects();
  };

  const updateProject = async (id) => {
    await updateDoc(doc(db, "projects", id), { projectId, projectName, projectDescription, projectDuration });
    clearForm(); setEditId(null); getProjects();
  };

  const deleteProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    getProjects();
  };

  const clearForm = () => {
    setProjectId(""); setProjectName(""); setProjectDescription(""); setProjectDuration("");
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">{editId ? "Update Project" : "Add New Project"}</h4>
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Project ID"
              value={projectId} onChange={e => setProjectId(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Project Name"
              value={projectName} onChange={e => setProjectName(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Description"
              value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control" placeholder="Duration (days)"
              value={projectDuration} onChange={e => setProjectDuration(e.target.value)} />
          </div>
        </div>
        <div className="mt-3">
          {editId ? (
            <button className="btn btn-primary me-2" onClick={() => updateProject(editId)}>Update</button>
          ) : (
            <button className="btn btn-success me-2" onClick={addProject}>Add</button>
          )}
          <button className="btn btn-secondary" onClick={clearForm}>Clear</button>
        </div>
      </div>

      <div className="row">
        {projects.map(proj => (
          <div className="col-md-6 mb-3" key={proj.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{proj.projectName} ({proj.projectId})</h5>
                <p className="card-text">{proj.projectDescription}</p>
                <small className="text-muted">Duration: {proj.projectDuration} days</small>
                <div className="mt-2">
                  <button className="btn btn-sm btn-warning me-2"
                    onClick={() => {
                      setEditId(proj.id);
                      setProjectId(proj.projectId);
                      setProjectName(proj.projectName);
                      setProjectDescription(proj.projectDescription);
                      setProjectDuration(proj.projectDuration);
                    }}>Edit</button>
                  <button className="btn btn-sm btn-danger"
                    onClick={() => deleteProject(proj.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectCRUD;
