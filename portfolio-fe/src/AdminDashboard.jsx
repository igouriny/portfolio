import { useEffect, useState } from "react";
import axiosInstance from "../src/api/axiosInstance";
import "./AdminDashboard.css";
import { FaWrench } from "react-icons/fa"; // Import wrench icon

function AdminDashboard() {
  const [academics, setAcademics] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [editAbout, setEditAbout] = useState(null);
  const aboutId = "1"; // Replace with actual About ID

  const [editAcademic, setEditAcademic] = useState(null);
  const [newAcademic, setNewAcademic] = useState({
    title: "",
    years: "",
    description: ""
  });

  const [editProfessional, setEditProfessional] = useState(null);
  const [newProfessional, setNewProfessional] = useState({
    title: "",
    years: "",
    description: ""
  });

  // Fetch Academics
  useEffect(() => {
    axiosInstance
      .get("/academics")
      .then((response) => setAcademics(response.data))
      .catch((error) => console.error("Error fetching academic records:", error));
  }, []);

  // Fetch Professionals
  useEffect(() => {
    axiosInstance
      .get("/professional")
      .then((response) => setProfessionals(response.data))
      .catch((error) => console.error("Error fetching professional records:", error));
  }, []);

  // Fetch About Data
  useEffect(() => {
    axiosInstance
      .get(`/about/${aboutId}`)
      .then((response) => setAboutData(response.data))
      .catch((error) => console.error("Error fetching About data:", error));
  }, [aboutId]);

  // About Section Handlers
  const enableAboutEdit = () => {
    setEditAbout({ ...aboutData });
  };

  const handleAboutChange = (e) => {
    setEditAbout({ ...editAbout, [e.target.name]: e.target.value });
  };

  const handleAboutSubmit = () => {
    axiosInstance
      .put(`/about/${aboutId}`, editAbout)
      .then((response) => {
        setAboutData(response.data);
        setEditAbout(null); // Exit edit mode
      })
      .catch((error) => console.error("Error updating About page:", error));
  };

  // Academic Handlers
  const enableEditAcademic = (academic) => {
    setEditAcademic({ ...academic }); // Clone object for editing
  };

  const handleEditAcademicChange = (e) => {
    setEditAcademic({ ...editAcademic, [e.target.name]: e.target.value });
  };

  const handleEditAcademicSubmit = (id) => {
    axiosInstance
      .put(`/academics/${id}`, editAcademic)
      .then((response) => {
        setAcademics(
          academics.map((academic) =>
            academic.id === id ? response.data : academic
          )
        );
        setEditAcademic(null);
      })
      .catch((error) => console.error("Error updating academic record:", error));
  };

  const handleNewAcademicSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/academics", newAcademic)
      .then((response) => {
        setAcademics([...academics, response.data]);
        setNewAcademic({ title: "", years: "", description: "" });
      })
      .catch((error) => console.error("Error adding academic record:", error));
  };

  const handleDeleteAcademic = (id) => {
    axiosInstance
      .delete(`/academics/${id}`)
      .then(() => setAcademics(academics.filter((academic) => academic.id !== id)))
      .catch((error) => console.error("Error deleting academic record:", error));
  };

  // Professional Handlers
  const enableEditProfessional = (professional) => {
    setEditProfessional({ ...professional });
  };

  const handleEditProfessionalChange = (e) => {
    setEditProfessional({ ...editProfessional, [e.target.name]: e.target.value });
  };

  const handleEditProfessionalSubmit = (id) => {
    axiosInstance
      .put(`/professional/${id}`, editProfessional)
      .then((response) => {
        setProfessionals(
          professionals.map((professional) =>
            professional.id === id ? response.data : professional
          )
        );
        setEditProfessional(null);
      })
      .catch((error) =>
        console.error("Error updating professional record:", error)
      );
  };

  const handleNewProfessionalSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/professional", newProfessional)
      .then((response) => {
        setProfessionals([...professionals, response.data]);
        setNewProfessional({ title: "", years: "", description: "" });
      })
      .catch((error) =>
        console.error("Error adding professional record:", error)
      );
  };

  const handleDeleteProfessional = (id) => {
    axiosInstance
      .delete(`/professional/${id}`)
      .then(() =>
        setProfessionals(
          professionals.filter((professional) => professional.id !== id)
        )
      )
      .catch((error) =>
        console.error("Error deleting professional record:", error)
      );
  };

  return (
    <div className="dashboard-container">
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        {/* About Page Edit Section */}
        <div className="about-section">
          <h2 className="section-title">Edit About Page</h2>
          {editAbout ? (
            <div className="edit-about-fields">
              <div>
                <label htmlFor="about-name">Name:</label>
                <input
                  id="about-name"
                  type="text"
                  name="name"
                  value={editAbout.name}
                  onChange={handleAboutChange}
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="about-subtitle">Subtitle:</label>
                <input
                  id="about-subtitle"
                  type="text"
                  name="subtitle"
                  value={editAbout.subtitle}
                  onChange={handleAboutChange}
                  placeholder="Subtitle"
                />
              </div>
              <div>
                <label htmlFor="about-content">Content:</label>
                <textarea
                  id="about-content"
                  name="content"
                  value={editAbout.content}
                  onChange={handleAboutChange}
                  placeholder="Content"
                ></textarea>
              </div>
              <div>
                <label htmlFor="about-leftContent">Left Content:</label>
                <textarea
                  id="about-leftContent"
                  name="leftContent"
                  value={editAbout.leftContent}
                  onChange={handleAboutChange}
                  placeholder="Left Content"
                ></textarea>
              </div>
              <div>
                <label htmlFor="about-rightContent">Right Content:</label>
                <textarea
                  id="about-rightContent"
                  name="rightContent"
                  value={editAbout.rightContent}
                  onChange={handleAboutChange}
                  placeholder="Right Content"
                ></textarea>
              </div>
              <button onClick={handleAboutSubmit}>Save</button>
            </div>
          ) : (
            <div className="about-display">
              <h3>{aboutData?.name}</h3>
              <p>
                <strong>Subtitle:</strong> {aboutData?.subtitle}
              </p>
              <p>
                <strong>Content:</strong> {aboutData?.content}
              </p>
              <p>
                <strong>Left Content:</strong> {aboutData?.leftContent}
              </p>
              <p>
                <strong>Right Content:</strong> {aboutData?.rightContent}
              </p>
              <button onClick={enableAboutEdit} className="edit-button">
                <FaWrench /> Edit
              </button>
            </div>
          )}
        </div>

        {/* Academic & Professional Records */}
        <div className="records-container">
          {/* Academic Section */}
          <div className="existing-records">
            <h2 className="section-title">Manage Academic Records</h2>
            <ul>
              {academics.map((academic) => (
                <li key={academic.id}>
                  {editAcademic && editAcademic.id === academic.id ? (
                    <div className="edit-form">
                      <div>
                        <label htmlFor={`academic-title-${academic.id}`}>
                          Title:
                        </label>
                        <input
                          id={`academic-title-${academic.id}`}
                          type="text"
                          name="title"
                          value={editAcademic.title}
                          onChange={handleEditAcademicChange}
                          placeholder="Title"
                        />
                      </div>
                      <div>
                        <label htmlFor={`academic-years-${academic.id}`}>
                          Years:
                        </label>
                        <input
                          id={`academic-years-${academic.id}`}
                          type="text"
                          name="years"
                          value={editAcademic.years}
                          onChange={handleEditAcademicChange}
                          placeholder="Years"
                        />
                      </div>
                      <div>
                        <label htmlFor={`academic-description-${academic.id}`}>
                          Description:
                        </label>
                        <textarea
                          id={`academic-description-${academic.id}`}
                          name="description"
                          value={editAcademic.description}
                          onChange={handleEditAcademicChange}
                          placeholder="Description"
                        ></textarea>
                      </div>
                      <button
                        onClick={() =>
                          handleEditAcademicSubmit(academic.id)
                        }
                      >
                        Save
                      </button>
                      <button onClick={() => setEditAcademic(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="display-record">
                      <p>
                        <strong>Title:</strong> {academic.title}
                      </p>
                      <p>
                        <strong>Years:</strong> {academic.years}
                      </p>
                      <p>
                        <strong>Description:</strong> {academic.description}
                      </p>
                      <button
                        onClick={() => enableEditAcademic(academic)}
                        className="edit-button"
                      >
                        <FaWrench />
                      </button>
                      <button
                        onClick={() => handleDeleteAcademic(academic.id)}
                        className="delete-button"
                      >
                        X
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Section */}
          <div className="existing-records">
            <h2 className="section-title">Manage Professional Records</h2>
            <ul>
              {professionals.map((professional) => (
                <li key={professional.id}>
                  {editProfessional && editProfessional.id === professional.id ? (
                    <div className="edit-form">
                      <div>
                        <label htmlFor={`professional-title-${professional.id}`}>
                          Title:
                        </label>
                        <input
                          id={`professional-title-${professional.id}`}
                          type="text"
                          name="title"
                          value={editProfessional.title}
                          onChange={handleEditProfessionalChange}
                          placeholder="Title"
                        />
                      </div>
                      <div>
                        <label htmlFor={`professional-years-${professional.id}`}>
                          Years:
                        </label>
                        <input
                          id={`professional-years-${professional.id}`}
                          type="text"
                          name="years"
                          value={editProfessional.years}
                          onChange={handleEditProfessionalChange}
                          placeholder="Years"
                        />
                      </div>
                      <div>
                        <label htmlFor={`professional-description-${professional.id}`}>
                          Description:
                        </label>
                        <textarea
                          id={`professional-description-${professional.id}`}
                          name="description"
                          value={editProfessional.description}
                          onChange={handleEditProfessionalChange}
                          placeholder="Description"
                        ></textarea>
                      </div>
                      <button
                        onClick={() =>
                          handleEditProfessionalSubmit(professional.id)
                        }
                      >
                        Save
                      </button>
                      <button onClick={() => setEditProfessional(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="display-record">
                      <p>
                        <strong>Title:</strong> {professional.title}
                      </p>
                      <p>
                        <strong>Years:</strong> {professional.years}
                      </p>
                      <p>
                        <strong>Description:</strong> {professional.description}
                      </p>
                      <button
                        onClick={() => enableEditProfessional(professional)}
                        className="edit-button"
                      >
                        <FaWrench />
                      </button>
                      <button
                        onClick={() => handleDeleteProfessional(professional.id)}
                        className="delete-button"
                      >
                        X
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Forms for Adding New Records */}
        <div className="records-container">
          <div className="new-record-form">
            <h2 className="section-title">Add New Academic Record</h2>
            <form onSubmit={handleNewAcademicSubmit}>
              <div>
                <label htmlFor="new-academic-title">Title:</label>
                <input
                  id="new-academic-title"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={newAcademic.title}
                  onChange={(e) =>
                    setNewAcademic({ ...newAcademic, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="new-academic-years">Years:</label>
                <input
                  id="new-academic-years"
                  type="text"
                  name="years"
                  placeholder="Years"
                  value={newAcademic.years}
                  onChange={(e) =>
                    setNewAcademic({ ...newAcademic, years: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="new-academic-description">Description:</label>
                <textarea
                  id="new-academic-description"
                  name="description"
                  placeholder="Description"
                  value={newAcademic.description}
                  onChange={(e) =>
                    setNewAcademic({
                      ...newAcademic,
                      description: e.target.value
                    })
                  }
                  required
                ></textarea>
              </div>
              <button type="submit">Add</button>
            </form>
          </div>

          <div className="new-record-form">
            <h2 className="section-title">Add New Professional Record</h2>
            <form onSubmit={handleNewProfessionalSubmit}>
              <div>
                <label htmlFor="new-professional-title">Title:</label>
                <input
                  id="new-professional-title"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={newProfessional.title}
                  onChange={(e) =>
                    setNewProfessional({
                      ...newProfessional,
                      title: e.target.value
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="new-professional-years">Years:</label>
                <input
                  id="new-professional-years"
                  type="text"
                  name="years"
                  placeholder="Years"
                  value={newProfessional.years}
                  onChange={(e) =>
                    setNewProfessional({
                      ...newProfessional,
                      years: e.target.value
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="new-professional-description">Description:</label>
                <textarea
                  id="new-professional-description"
                  name="description"
                  placeholder="Description"
                  value={newProfessional.description}
                  onChange={(e) =>
                    setNewProfessional({
                      ...newProfessional,
                      description: e.target.value
                    })
                  }
                  required
                ></textarea>
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
