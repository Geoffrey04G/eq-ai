import React, { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async () => {
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
        <h2 className="auth-title">Create Account</h2>
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
          placeholder="Create a password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister} className="auth-button">
          Create Account
        </button>
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <a href="/login" className="auth-link">Sign in here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
