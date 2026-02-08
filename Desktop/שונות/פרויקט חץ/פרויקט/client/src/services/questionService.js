import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => ({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const questionService = {
  getActiveQuestions: (classId) => 
    axios.get(`${API_URL}/questions/active/${classId}`),
  
  createQuestion: (questionData) => 
    axios.post(`${API_URL}/questions`, questionData, getAuthHeader()),
  
  deactivateQuestion: (questionId) => 
    axios.patch(`${API_URL}/questions/${questionId}/deactivate`, {}, getAuthHeader())
};

export default questionService;
