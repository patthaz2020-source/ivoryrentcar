import api from "./api";

export const serviceService = {
  list: () => api.get("/services"),
  create: (payload) => api.post("/services", payload),
  update: (id, payload) => api.put(`/services/${id}`, payload),
  remove: (id) => api.delete(`/services/${id}`),
};
