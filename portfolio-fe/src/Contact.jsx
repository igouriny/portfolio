import { useState } from "react";
import axios from "axios";
import "../src/Contact.css";

function Contact() {
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
      await axios.post(
        "https://portfolio-production-ca67.up.railway.app/api/v1/contact",
        formData
      );
      setStatus("Email sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="body">
      <div className="content">
        <h4 className="subtitle">SEND ME AN EMAIL</h4>
        <hr className="break" />
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="contact-send-button">
            SEND YOUR EMAIL
          </button>
        </form>
        {status && <p className="contact-status-message">{status}</p>}
      </div>
    </div>
  );
}

export default Contact;
