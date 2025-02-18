// portfolio-fe/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// Import jwt-decode as a namespace to work around the default export issue:
import * as jwtDecode from "jwt-decode";
import About from "./About.jsx";
import Academic from "./Academic.jsx";
import Contact from "./Contact.jsx";
import Professional from "./Professional.jsx";
import Testimonials from "./Testimonials.jsx";
import Layout from "./Layout.jsx";
import Logout from "./Logout.jsx";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [fade, setFade] = useState(false);
  const [user, setUser] = useState(null);

  // On mount, try to restore the user state from localStorage.
  useEffect(() => {
    // Attempt to retrieve a stored user and token from localStorage.
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      // If a full user object is stored, use it.
      setUser(JSON.parse(storedUser));
    } else if (token) {
      try {
        // Decode the token. Adjust the claim keys as per your backend.
        const decoded = jwtDecode.default(token);
        console.log("Decoded token:", decoded);
        // Assuming your token payload includes:
        //  - "sub": the username
        //  - "role": the user's role
        const userObj = { username: decoded.sub, role: decoded.role };
        setUser(userObj);
        // Optionally, store the reconstructed user for faster future access.
        localStorage.setItem("user", JSON.stringify(userObj));
      } catch (err) {
        console.error("Error decoding token:", err);
        setUser(null);
      }
    }
  }, []);

  // Handle section changes if you navigate between sections outside the router.
  const handleSectionChange = (section) => {
    setFade(true);
    setTimeout(() => {
      setActiveSection(section);
      setFade(false);
    }, 100);
  };

  // Render the correct section based on the activeSection state.
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
        {/* Display user info and the Logout button only if a user is logged in */}
        {user && (
          <div className="top-right">
            <div className="user-container">
              <Logout setUser={setUser} />
            </div>
          </div>
        )}
        {/* Pass user and setUser to Layout so that ProtectedRoute and Login can update/check it */}
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
