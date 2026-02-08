import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './StudentPage.css';
import smartSchoolLogo from '../assets/smart-school-logo.svg';

const StudentPage = ({ user, onLogout, onChangeRole }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const selectedQuestionsJSON = sessionStorage.getItem('selectedQuestions');
    if (selectedQuestionsJSON) {
      const selectedQuestions = JSON.parse(selectedQuestionsJSON);
      setQuestions(selectedQuestions);
    }
  }, []);

  const visibleQuestions = useMemo(() => {
    if (!studentName.trim()) {
      return questions;
    }
    const normalized = studentName.trim().toLowerCase();
    return questions.filter(q => !q.targetStudent || q.targetStudent.toLowerCase() === normalized);
  }, [questions, studentName]);

  useEffect(() => {
    if (currentQuestionIndex > 0 && currentQuestionIndex >= visibleQuestions.length) {
      setCurrentQuestionIndex(0);
      setAnswer(null);
      setSubmitted(false);
    }
  }, [visibleQuestions, currentQuestionIndex]);

  if (questions.length === 0) {
    return (
      <div className="student-page">
        <div className="student-header">
          <button className="home-logo" onClick={() => navigate('/')} title="חזרה לעמוד הבית">
            <img src={smartSchoolLogo} alt="Smart School" className="brand-logo" />
          </button>
          <div className="header-nav">
            <button className="role-switch-btn" onClick={() => { onChangeRole('teacher'); navigate('/teacher'); }} title="עמוד המורה">👩‍🏫</button>
            <button className="role-switch-btn" onClick={() => { onChangeRole('student'); navigate('/student'); }} title="עמוד התלמידה">🧑‍🎓</button>
            <button className="role-switch-btn" onClick={() => { onChangeRole('admin'); navigate('/admin'); }} title="לוח הנהלה">📊</button>
          </div>
          <div className="header-content">
            <h1>עמוד תלמידה</h1>
            <p>המורה עדיין לא פתחה סשן שאלות.</p>
          </div>
          <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
        </div>
        <div className="student-container">
          <p style={{ textAlign: 'center', color: '#5c6b70' }}>הסשן יופיע כאן כשהמורה תתחיל.</p>
        </div>
      </div>
    );
  }

  if (visibleQuestions.length === 0) {
    return (
      <div className="student-page">
        <div className="student-header">
          <button className="home-logo" onClick={() => navigate('/')} title="חזרה לעמוד הבית">
            <img src={smartSchoolLogo} alt="Smart School" className="brand-logo" />
          </button>
          <div className="header-nav">
            <button className="role-switch-btn" onClick={() => { onChangeRole('teacher'); navigate('/teacher'); }} title="עמוד המורה">👩‍🏫</button>
            <button className="role-switch-btn" onClick={() => { onChangeRole('student'); navigate('/student'); }} title="עמוד התלמידה">🧑‍🎓</button>
            <button className="role-switch-btn" onClick={() => { onChangeRole('admin'); navigate('/admin'); }} title="לוח הנהלה">📊</button>
          </div>
          <div className="header-content">
            <h1>עמוד תלמידה</h1>
            <p>הזיני את שמך כדי לראות שאלות ייעודיות.</p>
          </div>
          <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
        </div>
        <div className="student-container">
          <div className="name-card">
            <label>שם תלמידה</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="כתבי את שמך"
            />
            <p>אין שאלות פתוחות עבורך כרגע.</p>
          </div>
        </div>
      </div>
    );
  }

  const question = visibleQuestions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (answer !== null) {
      setSubmitted(true);
      setAnsweredCount(answeredCount + 1);
      setTimeout(() => {
        if (currentQuestionIndex < visibleQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnswer(null);
          setSubmitted(false);
        } else {
          setSubmitted('completed');
        }
      }, 1500);
    }
  };

  const handleNavigate = (role) => {
    onChangeRole(role);
    navigate(`/${role}`);
  };

  const handleRestart = () => {
    sessionStorage.removeItem('selectedQuestions');
    onChangeRole('teacher');
    navigate('/teacher');
  };

  return (
    <div className="student-page">
      <div className="student-header">
        <button className="home-logo" onClick={() => navigate('/')} title="חזרה לעמוד הבית">
          <img src={smartSchoolLogo} alt="Smart School" className="brand-logo" />
        </button>
        <div className="header-nav">
          <button className="role-switch-btn" onClick={() => handleNavigate('teacher')} title="עמוד המורה">👩‍🏫</button>
          <button className="role-switch-btn" onClick={() => handleNavigate('student')} title="עמוד התלמידה">🧑‍🎓</button>
          <button className="role-switch-btn" onClick={() => handleNavigate('admin')} title="לוח הנהלה">📊</button>
        </div>
        <div className="header-content">
          <h1>עמוד תלמידה</h1>
          <p>מענה מהיר וברור לסיום שיעור.</p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
      </div>

      <div className="student-content">
        {submitted === 'completed' ? (
          <div className="completion-screen">
            <div className="success-animation">
              <div className="checkmark">✓</div>
            </div>
            <h2>תודה!</h2>
            <p>ענית על כל השאלות בהצלחה.</p>
            <p className="response-summary">ענית על {answeredCount} שאלות</p>
            <button className="primary-button" onClick={handleRestart}>
              חזרה לתחילת הסשן
            </button>
          </div>
        ) : submitted ? (
          <div className="success-message">
            <h2>תודה!</h2>
            <p>התשובה נשמרה.</p>
            {currentQuestionIndex < visibleQuestions.length - 1 && (
              <p className="next-hint">השאלה הבאה מופיעה מיד.</p>
            )}
          </div>
        ) : (
          <div className="question-container">
            <div className="student-top">
              <div className="name-field">
                <label>שם תלמידה (אופציונלי)</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="כתבי את שמך"
                />
              </div>
              {question?.targetStudent && (
                <div className="target-pill">שאלה מיועדת ל: {question.targetStudent}</div>
              )}
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestionIndex + 1) / visibleQuestions.length) * 100}%` }}
              />
            </div>
            <p className="progress-text">
              שאלה {currentQuestionIndex + 1} מתוך {visibleQuestions.length}
            </p>

            <div className="question-box">
              <p className="question-text">{question.text}</p>

              <div className="answer-options">
                {question.questionType === 'yes-no' ? (
                  <>
                    <button
                      className={`option-btn yes ${answer === true ? 'selected' : ''}`}
                      onClick={() => setAnswer(true)}
                    >
                      <span className="icon">✓</span>
                      <span className="text">כן, הבנתי</span>
                    </button>
                    <button
                      className={`option-btn no ${answer === false ? 'selected' : ''}`}
                      onClick={() => setAnswer(false)}
                    >
                      <span className="icon">✕</span>
                      <span className="text">לא, צריכה חיזוק</span>
                    </button>
                  </>
                ) : question.questionType === 'multiple-choice' ? (
                  question.options.map((option, idx) => (
                    <button
                      key={idx}
                      className={`option-btn choice ${answer === idx ? 'selected' : ''}`}
                      onClick={() => setAnswer(idx)}
                    >
                      {option}
                    </button>
                  ))
                ) : null}
              </div>

              <button
                className="submit-btn"
                onClick={handleSubmitAnswer}
                disabled={answer === null}
              >
                שליחה
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StudentPage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string
  }),
  onLogout: PropTypes.func,
  onChangeRole: PropTypes.func.isRequired
};

StudentPage.defaultProps = {
  user: null,
  onLogout: () => {}
};

export default StudentPage;
