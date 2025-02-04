import { useEffect, useState } from "react";
import axiosInstance from "../src/api/axiosInstance";
import "../src/Academic.css"


function Academic() {
    const [academics, setAcademics] = useState([]);
    const [newAcademic, setNewAcademic] = useState({
        title: "",
        years: "",
        description: ""
    });

    useEffect(() => {
        axiosInstance.get("/academics")
            .then(response => setAcademics(response.data))
            .catch(error => console.error("Error fetching academic records:", error));
    }, []);

    const handleChange = (e) => {
        setNewAcademic({ ...newAcademic, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/academics", newAcademic)
            .then(response => setAcademics([...academics, response.data]))
            .catch(error => console.error("Error adding academic record:", error));
    };

    const handleDelete = (id) => {
        axiosInstance.delete(`/academics/${id}`)
            .then(() => setAcademics(academics.filter(academic => academic.id !== id)))
            .catch(error => console.error("Error deleting academic record:", error));
    };

    return (
        <div className="body">
            <div className="content">
                <br />
                <h4 className='subtitle'>STUDIES</h4>
                <hr className='break' />
                {academics.map((academic, index) => (
                    <div key={index} className='study-heading' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 className='study-title'>{academic.title}</h4>
                            <h5 className='study-subtitle'>{academic.years}</h5>
                            <p className='study-description'>{academic.description}</p>
                        </div>
                        <button onClick={() => handleDelete(academic.id)} className='delete-button'>X</button>
                    </div>
                ))}
                <br />
                <h4 className='subtitle'>Add Academic Record</h4>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newAcademic.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="years"
                        placeholder="Years"
                        value={newAcademic.years}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newAcademic.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Academic;
