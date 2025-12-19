import axios from 'axios';

const API_URL = import.meta.env.PROD
    ? 'https://portfolio-backend-babn.onrender.com/api'
    : 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 errors (token expired)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const verifyToken = () => api.get('/auth/verify');

// Projects
export const getProjects = () => api.get('/admin/projects');
export const createProject = (data) => api.post('/admin/projects', data);
export const updateProject = (id, data) => api.put(`/admin/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`);

// Certifications
export const getCertifications = () => api.get('/admin/certifications');
export const createCertification = (data) => api.post('/admin/certifications', data);
export const updateCertification = (id, data) => api.put(`/admin/certifications/${id}`, data);
export const deleteCertification = (id) => api.delete(`/admin/certifications/${id}`);

// Testimonials
export const getTestimonials = () => api.get('/admin/testimonials');
export const approveTestimonial = (id) => api.put(`/admin/testimonials/${id}/approve`);
export const deleteTestimonial = (id) => api.delete(`/admin/testimonials/${id}`);

// Stats
export const getStats = () => api.get('/admin/stats');

// Upload
export const uploadImage = (formData) => api.post('/upload/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export default api;
