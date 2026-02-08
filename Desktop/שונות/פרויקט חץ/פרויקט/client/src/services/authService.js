import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authService = {
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
  logout: () => localStorage.removeItem('token'),
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token)
};

export default authService;
