import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <main className={`body-content ${fade ? "hidden" : ""}`}>
                {renderSection()}
              </main>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
