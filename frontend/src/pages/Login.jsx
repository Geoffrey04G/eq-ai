import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.access_token);
      navigate("/onboarding");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card animate-slide-up">
        <h2 className="auth-title">Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="Enter your email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="auth-button">
          Sign In
        </button>
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? <a href="/register" className="auth-link">Create one here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;