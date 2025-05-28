import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [form, setForm] = useState({ name: "", location: "", age: "", job_role: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/profile", form);
      navigate("/chat");
    } catch (error) {
      console.error("Profile submission failed:", error);
      setError("Something went wrong while submitting your profile.");
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card animate-slide-up">
        {/* Logo */}
        <div className="auth-logo">
          <h1>EQ AI</h1>
        </div>
        
        {/* Tell us about yourself heading */}
        <h2 className="auth-title">Tell us about yourself</h2>
        
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Onboarding Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your full name"
            className="auth-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          
          <input
            type="text"
            placeholder="Your location"
            className="auth-input"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          
          <input
            type="number"
            placeholder="Your age"
            className="auth-input"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
          
          <input
            type="text"
            placeholder="Your job role"
            className="auth-input"
            value={form.job_role}
            onChange={(e) => setForm({ ...form, job_role: e.target.value })}
            required
          />
          
          <button type="submit" className="auth-button">
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;