import { useEffect, useState } from "react";
import axiosInstance from "../src/api/axiosInstance";
import "./Testimonials.css"

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [form, setForm] = useState({ name: "", affiliation: "", comment: "" });

    useEffect(() => {
        axiosInstance.get("/testimonials/approved")
            .then(response => {
                if (Array.isArray(response.data)) {
                    setTestimonials(response.data);
                } else {
                    setTestimonials([]); // Ensure it's an array
                }
            })
            .catch(error => {
                console.error("Error fetching testimonials:", error);
                setTestimonials([]); // Handle errors gracefully
            });
    }, []);

    const handleSubmit = async () => {
        if (!form.name || !form.affiliation || !form.comment) return;
        try {
            await axiosInstance.post("/testimonials", form);
            alert("Testimonial submitted for approval!");
            setForm({ name: "", affiliation: "", comment: "" }); // Clear form
        } catch (error) {
            console.error("Error submitting testimonial:", error);
        }
    };

    return (
        <div className="body">
            <div className="content">
                <br />
                <h4 className="subtitle">TESTIMONIALS</h4>
                <hr className="break" />

                {/* Display approved testimonials */}
                {testimonials.length === 0 ? (
                    <p>No testimonials yet.</p>
                ) : (
                    testimonials.map((testimonial, index) => (
                        <div key={index} className="study-heading">
                            <div>
                                <h4 className="study-title notranslate">{testimonial.name}</h4>
                                <h5 className="study-subtitle">{testimonial.affiliation}</h5>
                                <p className="study-description">"{testimonial.comment}"</p>
                            </div>
                        </div>
                    ))
                )}

                {/* Form to submit a new testimonial */}
                <br />
                <hr className='break' />
                <h4 className="subtitle">ADD YOUR TESTIMONIAL</h4>

                <div className="form-container">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Your Affiliation (e.g., 'Former Colleague')"
                        value={form.affiliation}
                        onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                    />
                    <textarea
                        className="input-field .fixed-text-area"
                        placeholder="Your Testimonial"
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;
