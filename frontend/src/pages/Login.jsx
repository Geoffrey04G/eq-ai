import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.access_token);
      // Navigate directly to chat, skipping onboarding
      navigate("/chat");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card animate-slide-up">
        {/* Logo */}
        <div className="auth-logo">
          <h1>EQ AI</h1>
        </div>
        
        {/* Welcome back heading */}
        <h2 className="auth-title">Welcome back</h2>
        
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Login Form */}
        <form onSubmit={handleLogin}>
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
        
        {/* Sign up link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account? <a href="/register" className="auth-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;