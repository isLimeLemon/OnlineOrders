import axios from "axios";

export const API = axios.create({
    baseURL:"http://localhost:4200/api",
    timeout:5000,
})