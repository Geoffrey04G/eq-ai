import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [form, setForm] = useState({ name: "", location: "", age: "", job_role: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/profile", form);
      navigate("/chat");
    } catch (error) {
      console.error("Profile submission failed:", error);
      alert("Something went wrong while submitting your profile.");
    }
  };

  return (
    <div className="onboarding-container animate-fade-in">
      <div className="onboarding-card animate-slide-up">
        <h2 className="onboarding-title">Tell us about yourself</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your full name" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="text" placeholder="Your location" className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <input type="number" placeholder="Your age" className="form-input" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
          <input type="text" placeholder="Your job role" className="form-input" value={form.job_role} onChange={(e) => setForm({ ...form, job_role: e.target.value })} required />
          <button type="submit" className="form-button">Complete Setup</button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;