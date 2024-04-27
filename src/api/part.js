import api from "./index";

export const createModel = async (name) => {
  return await api.post("/model/create", { name });
};

export const createYear = async (name) => {
  return await api.post("/year/create", { name });
};

export const createPart = async (name) => {
  return await api.post("/part/create", { name });
};

export const loadYearsModelsParts = async () => {
  return await api.get("/load/models-years-parts", {});
};

export const deleteModel = async (mid) => {
  return await api.delete(`/model/${mid}`);
};

export const deleteYear = async (yid) => {
  return await api.delete(`/year/${yid}`);
};

export const deletePart = async (pid) => {
  return await api.delete(`/part/${pid}`);
};

export const sendMail = async (contact, values) => {
  return await api.post("/nodemailer/send", { contact, values });
};
