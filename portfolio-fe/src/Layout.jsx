// portfolio-fe/src/Layout.jsx
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function Layout({ handleSectionChange, fade, renderSection, user, setUser }) {
  const location = useLocation();
  const isAdminPage = location.pathname === "/adminDashboard";
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="wrapper">
      <div className={isLoginPage ? "login-container" : "container"}>
        {(!isAdminPage && !isLoginPage) && <Navbar setActiveSection={handleSectionChange} />}
        <Routes>
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
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
