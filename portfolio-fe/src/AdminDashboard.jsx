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

    // New state variables for testimonials
    const [pendingTestimonials, setPendingTestimonials] = useState([]);
    const [approvedTestimonials, setApprovedTestimonials] = useState([]);

    // Fetch Academics
    useEffect(() => {
        axiosInstance.get("/academics")
            .then(response => setAcademics(response.data))
            .catch(error => console.error("Error fetching academic records:", error));
    }, []);

    // Fetch Professionals
    useEffect(() => {
        axiosInstance.get("/professional")
            .then(response => setProfessionals(response.data))
            .catch(error => console.error("Error fetching professional records:", error));
    }, []);

    // Fetch About Data
    useEffect(() => {
        axiosInstance.get(`/about/${aboutId}`)
            .then(response => setAboutData(response.data))
            .catch(error => console.error("Error fetching About data:", error));
    }, [aboutId]);

    // Fetch Pending Testimonials
    useEffect(() => {
        axiosInstance.get("/testimonials/pending")
            .then(response => setPendingTestimonials(response.data))
            .catch(error => console.error("Error fetching pending testimonials:", error));
    }, []);

    // Fetch Approved Testimonials
    useEffect(() => {
        axiosInstance.get("/testimonials/approved")
            .then(response => setApprovedTestimonials(response.data))
            .catch(error => console.error("Error fetching approved testimonials:", error));
    }, []);

    // Enable About Page Edit Mode
    const enableAboutEdit = () => {
        setEditAbout({ ...aboutData });
    };

    // Handle About Edit Input Changes
    const handleAboutChange = (e) => {
        setEditAbout({ ...editAbout, [e.target.name]: e.target.value });
    };

    // Save About Page Changes
    const handleAboutSubmit = () => {
        axiosInstance.put(`/about/${aboutId}`, editAbout)
            .then(response => {
                setAboutData(response.data);
                setEditAbout(null); // Exit edit mode
            })
            .catch(error => console.error("Error updating About page:", error));
    };

    // Enable Edit Mode for Academics
    const enableEditAcademic = (academic) => {
        setEditAcademic({ ...academic }); // Clone object for editing
    };

    // Enable Edit Mode for Professionals
    const enableEditProfessional = (professional) => {
        setEditProfessional({ ...professional }); // Clone object for editing
    };

    // Handle Input Changes for Academics
    const handleEditAcademicChange = (e) => {
        setEditAcademic({ ...editAcademic, [e.target.name]: e.target.value });
    };

    // Handle Input Changes for Professionals
    const handleEditProfessionalChange = (e) => {
        setEditProfessional({ ...editProfessional, [e.target.name]: e.target.value });
    };

    // Save Edited Academic Record
    const handleEditAcademicSubmit = (id) => {
        axiosInstance.put(`/academics/${id}`, editAcademic)
            .then(response => {
                setAcademics(academics.map(academic => (academic.id === id ? response.data : academic)));
                setEditAcademic(null);
            })
            .catch(error => console.error("Error updating academic record:", error));
    };

    // Save Edited Professional Record
    const handleEditProfessionalSubmit = (id) => {
        axiosInstance.put(`/professional/${id}`, editProfessional)
            .then(response => {
                setProfessionals(professionals.map(professional => (professional.id === id ? response.data : professional)));
                setEditProfessional(null);
            })
            .catch(error => console.error("Error updating professional record:", error));
    };

    // Add New Academic Record
    const handleNewAcademicSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/academics", newAcademic)
            .then(response => {
                setAcademics([...academics, response.data]);
                setNewAcademic({
                    title: "",
                    years: "",
                    description: ""
                });
            })
            .catch(error => console.error("Error adding academic record:", error));
    };

    // Add New Professional Record
    const handleNewProfessionalSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/professional", newProfessional)
            .then(response => {
                setProfessionals([...professionals, response.data]);
                setNewProfessional({
                    title: "",
                    years: "",
                    description: ""
                });
            })
            .catch(error => console.error("Error adding professional record:", error));
    };

    // Delete Academic Record
    const handleDeleteAcademic = (id) => {
        axiosInstance.delete(`/academics/${id}`)
            .then(() => setAcademics(academics.filter(academic => academic.id !== id)))
            .catch(error => console.error("Error deleting academic record:", error));
    };

    // Delete Professional Record
    const handleDeleteProfessional = (id) => {
        axiosInstance.delete(`/professional/${id}`)
            .then(() => setProfessionals(professionals.filter(professional => professional.id !== id)))
            .catch(error => console.error("Error deleting professional record:", error));
    };

    // Approve Testimonial
    const handleApproveTestimonial = (id) => {
        axiosInstance.put(`/testimonials/${id}/approve`)
            .then(response => {
                // Remove the testimonial from pending list and add it to the approved list
                setPendingTestimonials(pendingTestimonials.filter(testimonial => testimonial.id !== id));
                setApprovedTestimonials([...approvedTestimonials, response.data]);
            })
            .catch(error => console.error("Error approving testimonial:", error));
    };

    // Reject (Remove) Testimonial
    const handleRejectTestimonial = (id) => {
        axiosInstance.delete(`/testimonials/${id}/reject`)
            .then(() => {
                setPendingTestimonials(pendingTestimonials.filter(testimonial => testimonial.id !== id));
            })
            .catch(error => console.error("Error rejecting testimonial:", error));
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
                            <input
                                type="text"
                                name="name"
                                value={editAbout.name}
                                onChange={handleAboutChange}
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                name="subtitle"
                                value={editAbout.subtitle}
                                onChange={handleAboutChange}
                                placeholder="Subtitle"
                            />
                            <textarea
                                name="content"
                                value={editAbout.content}
                                onChange={handleAboutChange}
                                placeholder="Content"
                            ></textarea>
                            <textarea
                                name="leftContent"
                                value={editAbout.leftContent}
                                onChange={handleAboutChange}
                                placeholder="Left-Content"
                            ></textarea>
                            <textarea
                                name="rightContent"
                                value={editAbout.rightContent}
                                onChange={handleAboutChange}
                                placeholder="Right-Content"
                            ></textarea>
                            <button onClick={handleAboutSubmit}>Save</button>
                        </div>
                    ) : (
                        <div className="about-display">
                            <h3>{aboutData?.name}</h3>
                            <p>{aboutData?.subtitle}</p>
                            <p>{aboutData?.content}</p>
                            <p>{aboutData?.leftContent}</p>
                            <p>{aboutData?.rightContent}</p>
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
                                            <input
                                                type="text"
                                                name="title"
                                                value={editAcademic.title}
                                                onChange={handleEditAcademicChange}
                                                placeholder="Title"
                                            />
                                            <input
                                                type="text"
                                                name="years"
                                                value={editAcademic.years}
                                                onChange={handleEditAcademicChange}
                                                placeholder="Years"
                                            />
                                            <textarea
                                                name="description"
                                                value={editAcademic.description}
                                                onChange={handleEditAcademicChange}
                                                placeholder="Description"
                                            ></textarea>
                                            <button onClick={() => handleEditAcademicSubmit(academic.id)}>Save</button>
                                            <button onClick={() => setEditAcademic(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="display-record">
                                            <span>{academic.title} ({academic.years}) {academic.description}</span>
                                            <button onClick={() => enableEditAcademic(academic)} className="edit-button">
                                                <FaWrench />
                                            </button>
                                            <button onClick={() => handleDeleteAcademic(academic.id)} className="delete-button">
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
                                            <input
                                                type="text"
                                                name="title"
                                                value={editProfessional.title}
                                                onChange={handleEditProfessionalChange}
                                                placeholder="Title"
                                            />
                                            <input
                                                type="text"
                                                name="years"
                                                value={editProfessional.years}
                                                onChange={handleEditProfessionalChange}
                                                placeholder="Years"
                                            />
                                            <textarea
                                                name="description"
                                                value={editProfessional.description}
                                                onChange={handleEditProfessionalChange}
                                                placeholder="Description"
                                            ></textarea>
                                            <button onClick={() => handleEditProfessionalSubmit(professional.id)}>Save</button>
                                            <button onClick={() => setEditProfessional(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className="display-record">
                                            <span>{professional.title} ({professional.years}) {professional.description}</span>
                                            <button onClick={() => enableEditProfessional(professional)} className="edit-button">
                                                <FaWrench />
                                            </button>
                                            <button onClick={() => handleDeleteProfessional(professional.id)} className="delete-button">
                                                X
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Testimonials Management Section */}
                <div className="records-container">
                    <div className="existing-records">
                        <h2 className="section-title">Manage Testimonials</h2>
                        <div className="pending-testimonials">
                            <h3>Pending Testimonials</h3>
                            <ul>
                                {pendingTestimonials.map((testimonial) => (
                                    <li key={testimonial.id}>
                                        <div className="testimonial-item">
                                            <strong>{testimonial.name}</strong> - {testimonial.affiliation}
                                            <p>{testimonial.comment}</p>
                                            <button onClick={() => handleApproveTestimonial(testimonial.id)}>Approve</button>
                                            <button onClick={() => handleRejectTestimonial(testimonial.id)}>Reject</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="approved-testimonials">
                            <h3>Approved Testimonials</h3>
                            <ul>
                                {approvedTestimonials.map((testimonial) => (
                                    <li key={testimonial.id}>
                                        <div className="testimonial-item">
                                            <strong>{testimonial.name}</strong> - {testimonial.affiliation}
                                            <p>{testimonial.comment}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Forms for Adding New Records */}
                <div className="records-container">
                    <div className="new-record-form">
                        <h2 className="section-title">Add New Academic Record</h2>
                        <form onSubmit={handleNewAcademicSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newAcademic.title}
                                onChange={(e) => setNewAcademic({ ...newAcademic, title: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                name="years"
                                placeholder="Years"
                                value={newAcademic.years}
                                onChange={(e) => setNewAcademic({ ...newAcademic, years: e.target.value })}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newAcademic.description}
                                onChange={(e) => setNewAcademic({ ...newAcademic, description: e.target.value })}
                                required
                            ></textarea>
                            <button type="submit">Add</button>
                        </form>
                    </div>

                    <div className="new-record-form">
                        <h2 className="section-title">Add New Professional Record</h2>
                        <form onSubmit={handleNewProfessionalSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newProfessional.title}
                                onChange={(e) => setNewProfessional({ ...newProfessional, title: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                name="years"
                                placeholder="Years"
                                value={newProfessional.years}
                                onChange={(e) => setNewProfessional({ ...newProfessional, years: e.target.value })}
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newProfessional.description}
                                onChange={(e) => setNewProfessional({ ...newProfessional, description: e.target.value })}
                                required
                            ></textarea>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
