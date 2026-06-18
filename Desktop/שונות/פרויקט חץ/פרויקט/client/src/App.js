import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import DemoSelector from './pages/DemoSelector';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import AdminPage from './pages/AdminPage';
import ProspectusPage from './pages/ProspectusPage';
import PrintCodes from './pages/PrintCodes';
import topLeftMark from './assets/asset-top-left.svg';
import './App.css';

const HomeQuickLink = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <Link className="global-home-link" to="/" title="חזרה לדף הבית">
      דף הבית
    </Link>
  );
};

const GlobalTopLeftMark = () => (
  <Link className="global-top-left" to="/" title="דף הבית">
    <img src={topLeftMark} alt="Smart School" />
  </Link>
);

function App() {
  const [user, setUser] = useState(null);

  const handleSelectRole = (role) => {
    const newUser = { role, name: 'משתמש דמו' };
    setUser(newUser);
  };

  const handleChangeRole = (newRole) => {
    setUser({ role: newRole, name: 'משתמש דמו' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ErrorBoundary>
      <Router basename="/smart-school">
        <GlobalTopLeftMark />
        <HomeQuickLink />
        <Routes>
          <Route
            path="/"
            element={
              !user ? <DemoSelector onSelectRole={handleSelectRole} /> : <Navigate to={`/${user.role}`} />
            }
          />
          <Route
            path="/teacher"
            element={
              <TeacherPage user={user} onLogout={handleLogout} onChangeRole={handleChangeRole} />
            }
          />
          <Route
            path="/student"
            element={
              <StudentPage user={user} onLogout={handleLogout} onChangeRole={handleChangeRole} />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPage user={user} onLogout={handleLogout} onChangeRole={handleChangeRole} />
            }
          />
          <Route path="/prospectus" element={<ProspectusPage />} />
          <Route path="/print-codes" element={<PrintCodes />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
