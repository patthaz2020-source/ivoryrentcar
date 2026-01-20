import axios from "axios";

const api = axios.create({
    baseURL: "https://ivoryrentcar.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
  //onsole.log("API URL:", process.env.REACT_APP_API_URL);

});
console.log("API URL:", process.env.REACT_APP_API_URL);


export default api;
