import { useState } from "react";
import axios from "axios";
import "../src/Contact.css"; // Renamed CSS file to avoid conflicts

function Contact() { // Renamed component to avoid name collision
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            await axios.post("http://localhost:8080/api/v1/contact", formData); // Update API call if needed
            setStatus("Email sent successfully!");
            setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus("Failed to send email. Please try again.");
        }
    };

    return (
        <div className="contact-body"> {/* Renamed class */}
            <div className="contact-content"> {/* Renamed class */}
                <h4 className="contact-subtitle">SEND ME AN EMAIL</h4>
                <hr className="contact-break" />
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-input-group"> {/* Renamed class */}
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                    <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                    <button type="submit" className="contact-send-button">SEND YOUR EMAIL</button> {/* Renamed class */}
                </form>
                {status && <p className="contact-status-message">{status}</p>} {/* Renamed class */}
            </div>
        </div>
    );
}

export default Contact;
