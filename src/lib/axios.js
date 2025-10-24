import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://leetclone-next-backend-production.up.railway.app/api/v1",
  // baseURL: "http://localhost:8080/api/v1",
  baseURL: "https://15.207.112.103/api/v1",
  withCredentials: true,
});
