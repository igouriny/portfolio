// portfolio-fe/src/Academic.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../src/api/axiosInstance";
import "../src/Academic.css";
import DownloadCV from "./CVDownload"; // Import the CV download component

function Academic() {
  const [academics, setAcademics] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch academic records
  useEffect(() => {
    axiosInstance.get("/academics")
      .then(response => setAcademics(response.data))
      .catch(error => console.error("Error fetching academic records:", error));
  }, []);

  // Fetch project records
  useEffect(() => {
    axiosInstance.get("/projects")
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="body">
      <div className="content">
        <br />
        {/* Academics Section */}
        <h4 className="subtitle">STUDIES</h4>
        <hr className="break" />
        {academics.map((academic, index) => (
          <div key={index} className="study-heading">
            <div>
              <h4 className="study-title notranslate">{academic.title}</h4>
              {academic.years && <h5 className="study-subtitle">{academic.years}</h5>}
              <p className="study-description">{academic.description}</p>
            </div>
          </div>
        ))}

        <br />
        {/* Projects Section */}
        <h4 className="subtitle">PROJECTS</h4>
        <hr className="break" />
        {projects.map((project, index) => (
          <div key={index} className="project-heading">
            <div>
              <h4 className="project-title notranslate">{project.title}</h4>
              {/* For projects, we show the technologies used as a subtitle */}
              <p className="project-description">{project.description}</p>
              {project.technologiesUsed && <h5 className="project-subtitle">Technologies used: {project.technologiesUsed}</h5>}
              {project.projectUrl && (
                <p className="project-link">
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                    Github Repository
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <br />
      <hr className="break" />
      <DownloadCV /> {/* Downloadable CVs section */}
    </div>
  );
}

export default Academic;
