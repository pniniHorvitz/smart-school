const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Mock Data Storage
let mockQuestions = [];
let mockResponses = [];
let mockUsers = [
  { id: '1', email: 'teacher@test.com', password: 'password', role: 'teacher', name: 'רחל כהן' },
  { id: '2', email: 'student@test.com', password: 'password', role: 'student', name: 'דני סוקר' }
];

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Routes - Mock Endpoints
app.post('/api/auth/login', (req, res) => {
  const user = mockUsers.find(u => u.email === req.body.email);
  if (user) {
    res.json({ token: 'mock-token', user: { ...user, password: undefined } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/questions', (req, res) => {
  res.json(mockQuestions);
});

app.post('/api/questions', (req, res) => {
  const question = { id: Date.now().toString(), ...req.body };
  mockQuestions.push(question);
  res.json(question);
});

app.get('/api/responses', (req, res) => {
  res.json(mockResponses);
});

app.post('/api/responses', (req, res) => {
  const response = { id: Date.now().toString(), ...req.body };
  mockResponses.push(response);
  res.json(response);
});

app.get('/api/analytics', (req, res) => {
  res.json({ totalQuestions: mockQuestions.length, totalResponses: mockResponses.length });
});

// (predefined student-lists endpoint removed per revert request)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', mode: 'Mock Data' });
});

const PORT = process.env.PORT || 5000;
// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../client/build');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} with Mock Data`);
});

module.exports = app;
