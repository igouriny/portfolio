// portfolio-fe/src/Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./api/auth"; // Your updated logout helper
import "./Logout.css"; // Optional: add styles for the logout button

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Optionally call your backend logout endpoint
      await logoutUser();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear localStorage data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Clear the user state to immediately update the UI
      setUser(null);
      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
