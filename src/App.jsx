import React, { useState } from "react";
import About from "./About";
import Academic from "./Academic";
import Contact from "./Contact";
import Navbar from "./Navbar";

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [fade, setFade] = useState(false);

  const handleSectionChange = (section) => {
    setFade(true);
    setTimeout(() => {
      setActiveSection(section);
      setFade(false);
    }, 100); // Adjust the duration to match your CSS transition time
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'academic':
        return <Academic />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <nav className="box box1">
          <Navbar setActiveSection={handleSectionChange} />
        </nav>
        <main className={`box box2 body-content ${fade ? 'hidden' : ''}`}>
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;
