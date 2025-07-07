import axios from 'axios'

const baseURL = typeof window === 'undefined'
  ? process.env.VITE_API_BASE_URL || process.env.API_BASE_URL || "http://localhost:8000/api/"
  : (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/");

const newRequest = axios.create({
    baseURL,
    withCredentials: true
})

export default newRequest;