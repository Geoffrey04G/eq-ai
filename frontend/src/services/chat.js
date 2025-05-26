import api from "./api";

export const sendMessage = async (query) => {
  const res = await api.post("/chat", null, {
    params: { query },
  });
  return res.data.response;
};

export const uploadFile = async (file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await api.post("/files/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};