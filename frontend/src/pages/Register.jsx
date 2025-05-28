import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register(email, password);
      localStorage.setItem("token", res.access_token || "");
      navigate("/onboarding");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card animate-slide-up">
        {/* Logo */}
        <div className="auth-logo">
          <h1>EQ AI</h1>
        </div>
        
        {/* Create account heading */}
        <h2 className="auth-title">Create an account</h2>
        
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Register Form */}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" className="auth-button">
            Continue
          </button>
        </form>
        
        {/* Login link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <a href="/login" className="auth-link">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;