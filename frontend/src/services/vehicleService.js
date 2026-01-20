import api from "./api";

export const vehicleService = {
  list: () => api.get("/vehicles"),
  create: (formData) =>
    api.post("/vehicles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/vehicles/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  remove: (id) => api.delete(`/vehicles/${id}`),
};
