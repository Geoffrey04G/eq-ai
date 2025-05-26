import api from "./api";

export const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);
  const res = await api.post("/auth/login", formData);
  return res.data;
};

export const register = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);
  const res = await api.post("/auth/register", formData);
  return res.data;
};
