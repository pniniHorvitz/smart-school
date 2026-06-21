import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { questionBank, studentFocusInsights, studentLists } from '../services/mockData';
import './TeacherPage.css';
import smartSchoolLogo from '../assets/smart-school-logo.png';
import roleIcon from '../assets/role-icon.png';

const TeacherPage = ({ user, onLogout, onChangeRole }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('subject');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customType, setCustomType] = useState('yes-no');
  const [customOptions, setCustomOptions] = useState(['', '', '', '']);
  const [customTarget, setCustomTarget] = useState('');
  const [finalQuestions, setFinalQuestions] = useState([]);

  const subjects = Object.keys(questionBank);

  const getCurrentHomeworkMissing = () => {
    try {
      const codes = JSON.parse(sessionStorage.getItem('generatedCodes') || '[]');
      const submitted = JSON.parse(sessionStorage.getItem('homeworkSubmitted') || '[]');
      const submittedCodes = new Set(submitted.map(item => item.code));
      return codes
        .filter(item => !submittedCodes.has(item.code))
        .map(item => ({
          id: item.studentId,
          name: item.name,
          className: 'הסשן הנוכחי',
          subject: selectedSubject || 'שיעורי בית',
          percent: 0,
          note: 'טרם הוזן קוד שיעורי בית'
        }));
    } catch (e) {
      return [];
    }
  };

  const homeworkMissing = getCurrentHomeworkMissing().length > 0
    ? getCurrentHomeworkMissing()
    : studentFocusInsights.homeworkMissing;

  const handleSelectSubject = (subject) => {
    // starting a new subject flow: clear prior homework flags/codes so homework step can reappear
    sessionStorage.removeItem('homeworkHandled');
    sessionStorage.removeItem('generatedCodes');
    sessionStorage.removeItem('homeworkSkipped');
    setSelectedSubject(subject);
    setSelectedQuestions([]);
    setCurrentStep('selection');
  };

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleNextToCustom = () => {
    setCurrentStep('custom');
  };

  const handleAddCustomQuestion = useCallback(() => {
    const trimmedQuestion = customQuestion.trim();
    if (!trimmedQuestion) {
      alert('אנא הזיני שאלה');
      return;
    }

    if (trimmedQuestion.length < 5) {
      alert('השאלה קצרה מדי (לפחות 5 תווים)');
      return;
    }

    if (customType === 'multiple-choice') {
      const validOptions = customOptions.filter(o => o.trim());
      if (validOptions.length < 2) {
        alert('נדרשות לפחות 2 אפשרויות לשאלת בחירה');
        return;
      }
    }

    const customQ = {
      id: `custom-${Date.now()}`,
      text: trimmedQuestion,
      questionType: customType,
      subject: selectedSubject,
      isCustom: true,
      targetStudent: customTarget.trim() || null,
      options: customType === 'multiple-choice' ? customOptions.filter(o => o.trim()) : undefined
    };

    const selected = selectedSubject ? questionBank[selectedSubject].filter(q => selectedQuestions.includes(q.id)) : [];
    const newFinal = [...selected, customQ];
    setFinalQuestions(newFinal);
    // store for popup preview and open a preview window
    try {
      sessionStorage.setItem('finalQuestions', JSON.stringify(newFinal));
    } catch (e) {
      // ignore storage errors
    }
    setCurrentStep('preview');
  }, [customQuestion, customType, customOptions, selectedSubject, selectedQuestions, customTarget]);

  const handleBackToSelection = () => {
    setCustomQuestion('');
    setCustomType('yes-no');
    setCustomOptions(['', '', '', '']);
    setCustomTarget('');
    setCurrentStep('selection');
  };

  const handleStartSession = useCallback(() => {
    if (finalQuestions.length === 0) {
      alert('אנא בחרי לפחות שאלה אחת');
      return;
    }
    sessionStorage.setItem('selectedQuestions', JSON.stringify(finalQuestions));
    // Move flow to homework step first, then return to review
    setCurrentStep('homework');
  }, [finalQuestions]);

  const handleBackToPreview = () => {
    setCurrentStep('preview');
  };

  const handleStartQuestions = () => {
    onChangeRole('student');
    navigate('/student');
  };

  const [selectedListId, setSelectedListId] = useState(studentLists?.[0]?.id || '');
  const [homeworkChecked, setHomeworkChecked] = useState(true);
  const [homeworkError, setHomeworkError] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  const openHomeworkPopup = () => {
    // store needed data for inline homework step
    sessionStorage.setItem('finalQuestions', JSON.stringify(finalQuestions));
    sessionStorage.setItem('selectedSubject', JSON.stringify(selectedSubject));
    sessionStorage.setItem('selectedListId', selectedListId);
    // If homework was already decided, proceed to students; otherwise ask once.
    const handled = sessionStorage.getItem('homeworkHandled');
    const skipped = sessionStorage.getItem('homeworkSkipped');
    if (handled === '1' || skipped === '1') {
      handleStartQuestions();
    } else {
      setCurrentStep('homework');
    }
  };

  const generateCodesAndPrint = () => {
    const list = studentLists.find(l => l.id === selectedListId) || studentLists?.[0];
    if (!list || !list.students || list.students.length === 0) {
      setHomeworkError('לא נמצאה רשימת תלמידות תקינה');
      return;
    }
    const rand = () => Math.random().toString(36).slice(-6).toUpperCase();
    const codes = list.students.map(s => ({ studentId: s.id, name: s.name, code: rand() }));
    sessionStorage.setItem('generatedCodes', JSON.stringify(codes));
    sessionStorage.setItem('homeworkHandled', '1');
    sessionStorage.removeItem('homeworkSkipped');
    sessionStorage.setItem('returnTo', 'review');
    navigate('/print-codes');
  };

  const continueWithoutHomework = () => {
    sessionStorage.setItem('homeworkSkipped', '1');
    sessionStorage.removeItem('homeworkHandled');
    sessionStorage.removeItem('generatedCodes');
    // Move to review so the teacher can still see the "מוכן לשיתוף" summary before starting
    setCurrentStep('review');
  };

  const handleNavigate = (role) => {
    onChangeRole(role);
    navigate(`/${role}`);
  };

  // On mount, restore flow state when coming back from print view
  useEffect(() => {
    const fqRaw = sessionStorage.getItem('finalQuestions');
    if (fqRaw) {
      try {
        setFinalQuestions(JSON.parse(fqRaw));
      } catch (e) {
        // ignore
      }
    }
    const subj = sessionStorage.getItem('selectedSubject');
    if (subj) {
      try {
        setSelectedSubject(JSON.parse(subj));
      } catch (e) {}
    }
    const listId = sessionStorage.getItem('selectedListId');
    if (listId) setSelectedListId(listId);

    const rt = sessionStorage.getItem('returnTo');
    if (rt === 'review') {
      setCurrentStep('review');
      sessionStorage.removeItem('returnTo');
    } else if (rt === 'subject') {
      // clear homework flags and go to subject selection
      sessionStorage.removeItem('homeworkHandled');
      sessionStorage.removeItem('generatedCodes');
      sessionStorage.removeItem('homeworkSkipped');
      setCurrentStep('subject');
      sessionStorage.removeItem('returnTo');
    }
  }, []);

  return (
    <div className="teacher-page">
      <div className="teacher-header">
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
          <h1>עמוד מורה</h1>
          <p>בניית סט שאלות קצר לסיום שיעור, עם אפשרות לשאלה ייעודית.</p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
      </div>
      {/* Homework flow handled in popup page to preserve UX; popup reads sessionStorage */}

      <div className="teacher-container">
        {currentStep === 'subject' && (
          <>
            <div className="tracking-toggle">
              <button className="secondary-btn" onClick={() => setShowTracking(s => !s)}>
                {showTracking ? 'הסתר מעקב תלמידות' : 'הצג מעקב תלמידות'}
              </button>
            </div>

            {showTracking && (
              <section className="student-focus-section" aria-label="איתור תלמידות">
                <div className="focus-section-head">
                  <h2>תלמידות למעקב</h2>
                </div>
                <div className="focus-grid">
                  <div className="focus-panel alert">
                    <h3><span>לא השלימו ש״ב</span><strong>{homeworkMissing.length}</strong></h3>
                    {homeworkMissing.map(student => (
                      <div className="focus-row" key={`hw-${student.id}`}>
                        <div>
                          <strong>{student.name}</strong>
                          <span>{student.className} · {student.subject}</span>
                        </div>
                        <p>{student.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="focus-panel warning">
                    <h3><span>קושי חריג בחומר</span><strong>{studentFocusInsights.unusualDifficulty.length}</strong></h3>
                    {studentFocusInsights.unusualDifficulty.map(student => (
                      <div className="focus-row" key={`diff-${student.id}`}>
                        <div>
                          <strong>{student.name}</strong>
                          <span>{student.className} · {student.subject}</span>
                        </div>
                        <p>{student.percent}% הבנה · {student.note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="focus-panel success">
                    <h3><span>שיפור משמעותי</span><strong>{studentFocusInsights.improved.length}</strong></h3>
                    {studentFocusInsights.improved.map(student => (
                      <div className="focus-row" key={`up-${student.id}`}>
                        <div>
                          <strong>{student.name}</strong>
                          <span>{student.className} · {student.subject}</span>
                        </div>
                        <p>+{student.percent}% מהחודש הקודם · {student.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <div className="step-content">
              <h2>בחירת מקצוע</h2>
              <div className="subjects-grid">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    className="subject-button"
                    onClick={() => handleSelectSubject(subject)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSelectSubject(subject)}
                    tabIndex={0}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {currentStep === 'homework' && (
          <div className="step-content">
            <h2>שיעורי בית לפני מעבר לתלמידות</h2>
            <div className="custom-form">
              <p className="homework-step-desc">
                אם יש שיעורי בית, נפיק קוד אישי לכל תלמידה ונעבור לדף המדבקות להדפסה.
                אם אין שיעורי בית, התלמידות יתחילו מיד בשאלות.
              </p>
              <div className="form-group homework-toggle">
                <label>
                  <input type="radio" name="homework" checked={!homeworkChecked} onChange={() => setHomeworkChecked(false)} />
                  <span className="radio-text">אין שיעורי בית</span>
                </label>
                <label>
                  <input type="radio" name="homework" checked={homeworkChecked} onChange={() => setHomeworkChecked(true)} />
                  <span className="radio-text">יש שיעורי בית</span>
                </label>
              </div>

              {homeworkChecked && (
                <div className="form-group">
                  <label>בחרי רשימת תלמידות</label>
                  <select value={selectedListId} onChange={(e) => setSelectedListId(e.target.value)} className="homework-select">
                    {studentLists.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>
              )}

              {homeworkError && <p className="homework-error">{homeworkError}</p>}

              <div className="step-actions">
                {!homeworkChecked ? (
                  <button className="primary-btn" onClick={continueWithoutHomework}>אין שיעורי בית — מעבר לתלמידות</button>
                ) : (
                  <button className="primary-btn" onClick={generateCodesAndPrint}>יש שיעורי בית — הפקת מדבקות</button>
                )}
                <button className="secondary-btn" onClick={() => setCurrentStep('review')}>ביטול</button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'selection' && (
          <div className="step-content">
            <div className="step-header">
              <h2>בחירת שאלות מ{selectedSubject}</h2>
              <button className="secondary-btn" onClick={() => setCurrentStep('subject')}>חזרה למקצועות</button>
            </div>
            <div className="questions-list">
              {questionBank[selectedSubject].map(question => (
                <div key={question.id} className="question-item">
                  <input
                    type="checkbox"
                    id={question.id}
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => toggleQuestionSelection(question.id)}
                  />
                  <label htmlFor={question.id}>
                    <div className="question-text">{question.text}</div>
                    <div className="question-type">
                      {question.questionType === 'yes-no' ? 'כן / לא' : 'בחירה מרובה'}
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <div className="step-actions">
              <p className="selected-count">נבחרו {selectedQuestions.length} שאלות</p>
              <button className="primary-btn" onClick={handleNextToCustom}>
                {selectedQuestions.length > 0 ? 'הוספת שאלה ייעודית' : 'דלגי לשאלה ייעודית'}
              </button>
            </div>
          </div>
        )}

        {currentStep === 'custom' && (
          <div className="step-content">
            <h2>שאלה ייעודית לתלמידה</h2>
            <div className="custom-form">
              <div className="form-group">
                <label>טקסט השאלה</label>
                <textarea
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="כתבי כאן את השאלה..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>סוג השאלה</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="yes-no"
                      checked={customType === 'yes-no'}
                      onChange={(e) => setCustomType(e.target.value)}
                    />
                    כן / לא
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="multiple-choice"
                      checked={customType === 'multiple-choice'}
                      onChange={(e) => setCustomType(e.target.value)}
                    />
                    בחירה מרובה
                  </label>
                </div>
              </div>

              {customType === 'multiple-choice' && (
                <div className="form-group">
                  <label>אפשרויות תשובה</label>
                  {customOptions.map((option, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...customOptions];
                        newOptions[idx] = e.target.value;
                        setCustomOptions(newOptions);
                      }}
                      placeholder={`אפשרות ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="form-group">
                <label>למי מיועדת השאלה (אופציונלי)</label>
                <input
                  type="text"
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  placeholder="שם תלמידה"
                />
              </div>
            </div>

            <div className="step-actions">
              <button className="secondary-btn" onClick={handleBackToSelection}>חזרה</button>
              <button className="primary-btn" onClick={handleAddCustomQuestion}>להמשך לסקירה</button>
            </div>
          </div>
        )}

        {currentStep === 'preview' && (
          <div className="step-content">
            <h2>סקירת שאלות</h2>
            <div className="preview-list">
              {finalQuestions.map((q, idx) => (
                <div key={q.id} className="preview-item">
                  <div className="preview-number">{idx + 1}</div>
                  <div className="preview-details">
                    <p className="preview-text">{q.text}</p>
                    <div className="preview-meta">
                      {q.questionType === 'yes-no' ? 'כן / לא' : 'בחירה מרובה'}
                      {q.isCustom && <span className="custom-badge">שאלה ייעודית</span>}
                      {q.targetStudent && <span className="target-badge">לתלמידה: {q.targetStudent}</span>}
                    </div>
                  </div>
                </div>
              ))}

              {/* homework-preview removed: homework is handled in its own inline step before preview */}
            </div>

            <div className="step-actions">
              <button className="secondary-btn" onClick={() => setCurrentStep('custom')}>חזרה</button>
              <button className="success-btn" onClick={handleStartSession}>התחלת סשן לתלמידות</button>
            </div>

            {/* (removed duplicate homework-box; inline homework-preview kept) */}
          </div>
        )}

        {currentStep === 'review' && (
          <div className="step-content">
            <h2>מוכן לשיתוף</h2>
            <div className="review-summary">
              <div className="summary-card">
                <div className="summary-icon">📋</div>
                <div className="summary-info">
                  <p className="summary-title">סה״כ שאלות</p>
                  <p className="summary-value">{finalQuestions.length}</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📚</div>
                <div className="summary-info">
                  <p className="summary-title">מקצוע</p>
                  <p className="summary-value">{selectedSubject}</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">⏱️</div>
                <div className="summary-info">
                  <p className="summary-title">משך משוער</p>
                  <p className="summary-value">{finalQuestions.length * 0.5} דק׳</p>
                </div>
              </div>
            </div>

            <div className="questions-summary">
              <h3>השאלות שלך:</h3>
              <div className="questions-preview">
                {finalQuestions.map((q, idx) => (
                  <div key={q.id} className="question-preview">
                    <span className="q-number">{idx + 1}.</span>
                    <span className="q-text">{q.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="step-actions">
              <button className="secondary-btn" onClick={handleBackToPreview}>חזרה לעריכה</button>
              <button className="success-btn" onClick={openHomeworkPopup}>מעבר לתלמידות</button>
            </div>

            {(() => {
              let hasHomework = false;
              try {
                const handled = sessionStorage.getItem('homeworkHandled');
                const codesRaw = sessionStorage.getItem('generatedCodes');
                const codes = codesRaw ? JSON.parse(codesRaw) : [];
                hasHomework = handled === '1' || (codes && codes.length > 0);
              } catch (e) {
                hasHomework = false;
              }

              return (
                <div className="homework-box" role="region" aria-label="השלב הבא">
                  <div className={`homework-accent ${hasHomework ? 'active' : 'inactive'}`}>{hasHomework ? 'V' : 'X'}</div>
                  <div className="homework-content">
                    <h3 className="homework-title">{hasHomework ? 'יש שיעורי בית' : 'אין שיעורי בית'}</h3>
                    <div className="homework-summary">
                      <p className="homework-list">
                        {hasHomework
                          ? 'הופקו קודי שיעורי בית — ניתן להדפיס או להמשיך לשיתוף עם הקודים.'
                          : 'בחרת שאין שיעורי בית — נמשיך לשיתוף השאלות ללא הפקת מדבקות.'}
                      </p>
                    </div>
                    <div className="homework-actions">
                      {hasHomework ? (
                        <button className="primary-btn" onClick={() => { navigate('/print-codes'); }}>הצג/הדפס קודים</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

TeacherPage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string
  }),
  onLogout: PropTypes.func,
  onChangeRole: PropTypes.func.isRequired
};

TeacherPage.defaultProps = {
  user: null,
  onLogout: () => {}
};

export default TeacherPage;
