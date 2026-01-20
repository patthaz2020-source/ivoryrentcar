import axios from "axios";
import { api } from "../../../api/api";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default api;
