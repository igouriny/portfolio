import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import About from "./About.jsx";
import Academic from "./Academic.jsx";
import Contact from "./Contact.jsx";
import Professional from "./Professional.jsx";
import Testimonials from "./Testimonials.jsx";
import Layout from "./Layout.jsx";

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
