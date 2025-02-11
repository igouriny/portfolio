import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
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
        {/* Only show Navbar if not on the admin page */}
        {!isAdminPage && <Navbar setActiveSection={handleSectionChange} />}
        <Routes>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route 
            path="*" 
            element={
              <main className={`body-content ${fade ? 'hidden' : ''}`}>
                {renderSection()}
              </main>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
