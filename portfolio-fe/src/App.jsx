// portfolio-fe/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import About from "./About.jsx";
import Academic from "./Academic.jsx";
import Contact from "./Contact.jsx";
import Professional from "./Professional.jsx";
import Testimonials from "./Testimonials.jsx";
import Layout from "./Layout.jsx";
import Logout from "./Logout.jsx"; // if used on non-login pages
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [fade, setFade] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSectionChange = (section) => {
    setFade(true);
    setTimeout(() => {
      setActiveSection(section);
      setFade(false);
    }, 100);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <About />;
      case "academic":
        return <Academic />;
      case "contact":
        return <Contact />;
      case "professional":
        return <Professional />;
      case "testimonials":
        return <Testimonials />;
      default:
        return <About />;
    }
  };

  return (
    <Router>
      <div className="app-wrapper">
        {user && (
          <div className="top-right">
            <div className="user-container">
              <Logout setUser={setUser} />
            </div>
          </div>
        )}
        {/* Pass setUser along with user to Layout */}
        <Layout
          handleSectionChange={handleSectionChange}
          fade={fade}
          renderSection={renderSection}
          user={user}
          setUser={setUser}
        />
      </div>
    </Router>
  );
}

export default App;
