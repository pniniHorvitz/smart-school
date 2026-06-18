import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockAnalytics } from '../services/mockData';
import './AdminPage.css';
import smartSchoolLogo from '../assets/smart-school-logo.png';
import roleIcon from '../assets/role-icon.png';

const AdminPage = ({ user, onLogout, onChangeRole }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('classes');

  const COLORS = ['#2c9aa1', '#1f6d86', '#2b5163', '#4b7b8c', '#9aa8a4'];

  const handleNavigate = (role) => {
    onChangeRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <button className="home-logo" onClick={() => navigate('/')} title="חזרה לעמוד הבית">
          <img src={smartSchoolLogo} alt="Smart School" className="brand-logo" />
        </button>
        <div className="header-nav">
          <button className="role-switch-btn" onClick={() => handleNavigate('teacher')} title="עמוד המורה">
            <img src={roleIcon} alt="" aria-hidden="true" />
            <span className="role-switch-text">מורה</span>
          </button>
          <button className="role-switch-btn" onClick={() => handleNavigate('student')} title="עמוד התלמידה">
            <img src={roleIcon} alt="" aria-hidden="true" />
            <span className="role-switch-text">תלמידה</span>
          </button>
          <button className="role-switch-btn" onClick={() => handleNavigate('admin')} title="לוח הנהלה">
            <img src={roleIcon} alt="" aria-hidden="true" />
            <span className="role-switch-text">הנהלה</span>
          </button>
        </div>
        <div className="header-content">
          <h1>לוח הנהלה</h1>
          <p>תמונה מערכתית של הבנה, איכות הוראה ומגמות בכיתות חטיבה ותיכון.</p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
      </div>

      <div className="admin-container">
        <div className="kpi-cards">
          <div className="kpi-card">
            <div className="kpi-icon">👥</div>
            <div className="kpi-content">
              <span className="kpi-label">כיתות פעילות</span>
              <span className="kpi-value">{mockAnalytics.byClass.length}</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">👩‍🏫</div>
            <div className="kpi-content">
              <span className="kpi-label">מורות</span>
              <span className="kpi-value">{mockAnalytics.byTeacher.length}</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">📈</div>
            <div className="kpi-content">
              <span className="kpi-label">ממוצע הבנה</span>
              <span className="kpi-value">86%</span>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">📝</div>
            <div className="kpi-content">
              <span className="kpi-label">תשובות היום</span>
              <span className="kpi-value">125</span>
            </div>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            className={activeTab === 'classes' ? 'active' : ''}
            onClick={() => setActiveTab('classes')}
          >
            לפי כיתות
          </button>
          <button
            className={activeTab === 'teachers' ? 'active' : ''}
            onClick={() => setActiveTab('teachers')}
          >
            לפי מורות
          </button>
          <button
            className={activeTab === 'subjects' ? 'active' : ''}
            onClick={() => setActiveTab('subjects')}
          >
            לפי מקצועות
          </button>
          <button
            className={activeTab === 'insights' ? 'active' : ''}
            onClick={() => setActiveTab('insights')}
          >
            תובנות
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'classes' && (
            <div className="chart-container">
              <h2>הבנה לפי כיתה</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mockAnalytics.byClass}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d8e2df" />
                  <XAxis dataKey="name" stroke="#54646a" />
                  <YAxis stroke="#54646a" />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #c9d6d2', borderRadius: '8px' }}
                    formatter={(value) => `${value}%`}
                  />
                  <Legend />
                  <Bar dataKey="understanding" fill="#2c9aa1" name="אחוז הבנה" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="chart-summary">
                {mockAnalytics.byClass.map((cls, idx) => (
                  <div key={idx} className="summary-item">
                    <span className="class-name">{cls.name}</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${cls.understanding}%` }} />
                    </div>
                    <span className="score-text">{cls.understanding}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="chart-container">
              <h2>ביצוע לפי מורה</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mockAnalytics.byTeacher} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#d8e2df" />
                  <XAxis type="number" stroke="#54646a" />
                  <YAxis dataKey="name" type="category" stroke="#54646a" width={80} />
                  <Tooltip
                    contentStyle={{ background: '#fff', border: '1px solid #c9d6d2', borderRadius: '8px' }}
                    formatter={(value) => `${value}%`}
                  />
                  <Legend />
                  <Bar dataKey="understanding" fill="#1f6d86" name="אחוז הבנה" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="chart-container">
              <h2>התפלגות לפי מקצוע</h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={mockAnalytics.bySubject}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={100}
                    fill="#2c9aa1"
                    dataKey="value"
                  >
                    {mockAnalytics.bySubject.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="subject-summary">
                {mockAnalytics.bySubject.map((subject, idx) => (
                  <div key={idx} className="subject-item">
                    <div className="subject-dot" style={{ background: COLORS[idx] }} />
                    <span className="subject-name">{subject.name}</span>
                    <span className="subject-value">{subject.understanding}% הבנה</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="insights-section">
              <div className="insights-grid">
                {mockAnalytics.insights.map((insight, idx) => (
                  <div key={idx} className="insight-card" style={{ borderColor: insight.color }}>
                    <div className="insight-header" style={{ background: insight.color }}>
                      {insight.title}
                    </div>
                    <div className="insight-body">
                      <p>{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="recommendations-section">
                <h3>המלצות לפעולה</h3>
                <ul className="recommendations-list">
                  <li>שילוב חיזוק קצר בתחילת שיעור ונקודות עצירה לבדיקת הבנה.</li>
                  <li>קידום למידה פעילה בקבוצות קטנות ושאלות פתוחות קצרות.</li>
                  <li>הנגשת דפי חזרה ממוקדים לפני מבחנים ושיעורי תגבור ממוקדים.</li>
                  <li>מעקב רגשי וחברתי לצד ההישגים: שיחות אישיות וחיזוק מוטיבציה.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AdminPage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string
  }),
  onLogout: PropTypes.func,
  onChangeRole: PropTypes.func.isRequired
};

AdminPage.defaultProps = {
  user: null,
  onLogout: () => {}
};

export default AdminPage;
