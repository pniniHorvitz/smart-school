import React from 'react';
import PropTypes from 'prop-types';
import './DemoSelector.css';
import smartSchoolLogo from '../assets/smart-school-logo.svg';



const DemoSelector = ({ onSelectRole }) => {
  return (
    <div className="demo-selector">
      <header className="landing-hero">
        <div className="hero-top">
          <div className="logo-wrap">
            <img className="hero-logo" src={smartSchoolLogo} alt="Smart School" />
          </div>
        </div>

        <div className="hero-body">
          <div className="hero-text">
            <h1>מדידה חכמה — למידה משמעותית</h1>
            <p className="hero-subtitle">מעקב בזמן אמת שמייצר תמונת למידה מיידית.</p>
          </div>
        </div>

      </header>

      <section className="home-grid">
        <div className="home-card">
          <h2>תמונה מיידית לשיעור</h2>
          <p>מדידה קצרה וברורה שמעניקה למורה החלטות בזמן אמת.</p>
        </div>
        <div className="home-card">
          <h2>פידבק מדויק לתלמידה</h2>
          <p>שאלות נקודתיות לפי צורך, בלי לשבור את רצף השיעור.</p>
        </div>
        <div className="home-card">
          <h2>תובנות ניהוליות</h2>
          <p>השוואות בין כיתות, מגמות לאורך זמן ומיקוד מקצועות.</p>
        </div>
      </section>

      <section className="role-section">
        <div className="section-head">
          <h2>בחירת תפקיד</h2>
          <p>כניסה מהירה לסביבה המתאימה.</p>
        </div>
        <div className="role-grid">
          <div className="role-card teacher-card">
            <div className="card-icon">👩‍🏫</div>
            <h3>מורה</h3>
            <p>בניית סשן שאלות קצר ואפקטיבי.</p>
            <button className="unified-cta" onClick={() => onSelectRole('teacher')}>
              כניסה למורות
            </button>
          </div>
          <div className="role-card student-card">
            <div className="card-icon">🧑‍🎓</div>
            <h3>תלמידה</h3>
            <p>מענה פשוט ומהיר בסיום שיעור.</p>
            <button className="unified-cta" onClick={() => onSelectRole('student')}>
              כניסה לתלמידות
            </button>
          </div>
          <div className="role-card admin-card">
            <div className="card-icon">📈</div>
            <h3>הנהלה</h3>
            <p>מעקב ארוך טווח על איכות ההוראה.</p>
            <button className="unified-cta" onClick={() => onSelectRole('admin')}>
              כניסה להנהלה
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>SMART SCHOOL · מערכת מעקב רציפה · 2026</p>
      </footer>
    </div>
  );
};

DemoSelector.propTypes = {
  onSelectRole: PropTypes.func.isRequired
};

export default DemoSelector;
