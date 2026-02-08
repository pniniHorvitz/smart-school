import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const analyticsService = {
  getByClass: (classId) => 
    axios.get(`${API_URL}/analytics/by-class/${classId}`, getAuthHeader()),
  
  getByTeacher: (teacherId) => 
    axios.get(`${API_URL}/analytics/by-teacher/${teacherId}`, getAuthHeader()),
  
  getBySubject: (subject) => 
    axios.get(`${API_URL}/analytics/by-subject/${subject}`, getAuthHeader()),
  
  getByPeriod: (startDate, endDate) => 
    axios.get(`${API_URL}/analytics/by-period/${startDate}/${endDate}`, getAuthHeader())
};

export default analyticsService;
