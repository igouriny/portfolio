// portfolio-fe/src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./api/auth";
import "./Login.css";

const Login = ({ setUser }) => {
  const [username, setUsernameLocal] = useState("");
  const [password, setPasswordLocal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const data = await loginUser(username, password);
      // Update the user state with the returned data (assuming it contains username and role)
      setUser({ username: data.username, role: data.role });
      navigate("/adminDashboard");
    } catch (error) {
      setErrorMsg(error.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPasswordLocal(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Log In</button>
      </form>
    </div>
  );
};

export default Login;
