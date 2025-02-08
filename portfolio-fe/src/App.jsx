import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import About from "./About.jsx";
import Academic from "./Academic.jsx";
import Contact from "./Contact.jsx";
import Navbar from "./Navbar.jsx";
import Professional from "./Professional.jsx";
import AdminDashboard from "./AdminDashboard.jsx"; // Ensure this file exists
import Testimonials from "./Testimonials.jsx";

function Layout({ handleSectionChange, fade, renderSection }) {
  const location = useLocation();
  const isAdminPage = location.pathname === "/adminDashboard";

  return (
    <div className="wrapper">
      <div className="container">
        {/* Conditionally hide Navbar */}
        {!isAdminPage && (
          <nav className="box box1">
            <Navbar setActiveSection={handleSectionChange} />
          </nav>
        )}
        <Routes>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route 
            path="*" 
            element={
              <main className={`box box2 body-content ${fade ? 'hidden' : ''}`}>
                {renderSection()}
              </main>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [fade, setFade] = useState(false);

  const handleSectionChange = (section) => {
    setFade(true);
    setTimeout(() => {
      setActiveSection(section);
      setFade(false);
    }, 100);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'academic':
        return <Academic />;
      case 'contact':
        return <Contact />;
      case 'professional':
        return <Professional />;
      case 'testimonials':
        return <Testimonials />;
      default:
        return <About />;
    }
  };

  return (
    <Router>
      <Layout 
        handleSectionChange={handleSectionChange} 
        fade={fade} 
        renderSection={renderSection} 
      />
    </Router>
  );
}

export default App;
