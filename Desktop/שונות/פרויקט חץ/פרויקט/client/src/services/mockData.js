// Mock data for demo purposes

export const questionBank = {
  'מתמטיקה': [
    {
      id: 'q1',
      text: 'האם השיטה לפתרון פונקציות ריבועיות ברורה?',
      questionType: 'yes-no',
      subject: 'מתמטיקה'
    },
    {
      id: 'q2',
      text: 'מהו ערך ה־X עבור 2x + 6 = 14?',
      questionType: 'multiple-choice',
      options: ['2', '4', '6', '8'],
      correctAnswer: 1,
      subject: 'מתמטיקה'
    },
    {
      id: 'q3',
      text: 'האם ברור איך מציבים בנוסחת השורשים?',
      questionType: 'yes-no',
      subject: 'מתמטיקה'
    }
  ],
  'אנגלית': [
    {
      id: 'q4',
      text: 'Did you understand the main idea of the text?',
      questionType: 'yes-no',
      subject: 'אנגלית'
    },
    {
      id: 'q5',
      text: 'Which sentence is grammatically correct?',
      questionType: 'multiple-choice',
      options: ['She go to school', 'She goes to school', 'She going to school', 'She gone to school'],
      correctAnswer: 1,
      subject: 'אנגלית'
    }
  ],
  'היסטוריה': [
    {
      id: 'q6',
      text: 'האם ברור מה היו הגורמים למלחמת העולם הראשונה?',
      questionType: 'yes-no',
      subject: 'היסטוריה'
    },
    {
      id: 'q7',
      text: 'איזו שנה מסמנת את תחילת המלחמה?',
      questionType: 'multiple-choice',
      options: ['1905', '1914', '1918', '1923'],
      correctAnswer: 1,
      subject: 'היסטוריה'
    }
  ],
  'חץ': [
    {
      id: 'q8',
      text: 'האם הבנת את הרעיון שעומד מאחורי חץ?',
      questionType: 'yes-no',
      subject: 'חץ'
    },
    {
      id: 'q9',
      text: 'האם את מרגישה שהכלים שנתנו לך בחץ יעזרו לך להיות מורה טובה יותר?',
      questionType: 'multiple-choice',
      options: ['כן מאוד', 'כן', 'לא ממש', 'לא כלל'],
      correctAnswer: 0,
      subject: 'חץ'
    }
  ],
  'ספרות': [
    {
      id: 'q10',
      text: 'האם הצלחת לזהות את המסר המרכזי של היצירה?',
      questionType: 'yes-no',
      subject: 'ספרות'
    },
    {
      id: 'q11',
      text: 'מה מאפיין את נקודת המבט של המספר?',
      questionType: 'multiple-choice',
      options: ['מספר כל־יודע', 'מספר בגוף ראשון', 'מספר חיצוני', 'מספר מעורב'],
      correctAnswer: 1,
      subject: 'ספרות'
    }
  ],

};

export const mockQuestions = [
  {
    id: '1',
    text: 'האם ברור החומר על פונקציות?',
    teacherId: 'teacher1',
    teacherName: 'דנה כהן',
    classId: 'class-10a',
    className: 'י׳1',
    subject: 'מתמטיקה',
    questionType: 'yes-no',
    isActive: true,
    createdAt: new Date(Date.now() - 10 * 60000),
    lessonDate: new Date()
  },
  {
    id: '2',
    text: 'מהו ערך ה־X עבור 2x + 6 = 14?',
    teacherId: 'teacher1',
    teacherName: 'דנה כהן',
    classId: 'class-10a',
    className: 'י׳1',
    subject: 'מתמטיקה',
    questionType: 'multiple-choice',
    options: ['2', '4', '6', '8'],
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 60000),
    lessonDate: new Date()
  }
];

export const mockResponses = {
  '1': [
    { answer: true, respondentClass: 'י׳1' },
    { answer: true, respondentClass: 'י׳1' },
    { answer: false, respondentClass: 'י׳1' },
    { answer: true, respondentClass: 'י׳1' }
  ],
  '2': [
    { answer: 1, respondentClass: 'י׳1' },
    { answer: 1, respondentClass: 'י׳1' },
    { answer: 0, respondentClass: 'י׳1' }
  ]
};

export const mockAnalytics = {
  byClass: [
    { name: 'י׳1', understanding: 85, responses: 24, totalStudents: 28 },
    { name: 'י׳2', understanding: 92, responses: 28, totalStudents: 30 },
    { name: 'י״א1', understanding: 78, responses: 22, totalStudents: 25 },
    { name: 'י״ב2', understanding: 88, responses: 26, totalStudents: 29 }
  ],
  byTeacher: [
    { name: 'דנה כהן', understanding: 88, responses: 35, avgClassSize: 28 },
    { name: 'שרה דוד', understanding: 82, responses: 32, avgClassSize: 26 },
    { name: 'מרים לוי', understanding: 90, responses: 38, avgClassSize: 30 },
    { name: 'דבורה ברק', understanding: 85, responses: 30, avgClassSize: 27 }
  ],
  bySubject: [
    { name: 'מתמטיקה', value: 30, understanding: 86 },
    { name: 'אנגלית', value: 20, understanding: 84 },
    { name: 'היסטוריה', value: 15, understanding: 80 },
    { name: 'ספרות', value: 10, understanding: 82 },
    { name: 'חץ', value: 15, understanding: 90 }
  ],
  insights: [
    {
      type: 'success',
      title: 'נקודת חוזק',
      description: 'י׳2 מציגה שיפור עקבי במדדי הבנה בשבועיים האחרונים.',
      color: '#2c9aa1'
    },
    {
      type: 'attention',
      title: 'שטח לשיפור',
      description: 'נדרש תגבור נקודתי בכיתות י״א במקצוע היסטוריה.',
      color: '#d19a66'
    },
    {
      type: 'trend',
      title: 'מגמה חיובית',
      description: 'עלייה של 12% במדדי ההבנה במקצועות ההומניים.',
      color: '#1f6d86'
    }
  ]
};

export const studentFocusInsights = {
  homeworkMissing: [
    { id: 's2', name: 'מאיה לוי', className: 'י׳1', subject: 'מתמטיקה', percent: 0, note: 'לא הוזן קוד שיעורי בית בסשן האחרון' },
    { id: 's7', name: 'שירה טל', className: 'י״א2', subject: 'מתמטיקה', percent: 0, note: 'שני שיעורי בית חסרים השבוע' }
  ],
  unusualDifficulty: [
    { id: 's3', name: 'טליה ברק', className: 'י׳1', subject: 'פונקציות', percent: 38, note: 'פער חריג ביחס לממוצע הכיתה' },
    { id: 's10', name: 'ליהו אביטל', className: 'קבוצת אנגלית', subject: 'אנסין', percent: 42, note: 'נדרשת בדיקת הבנה נקודתית' }
  ],
  improved: [
    { id: 's1', name: 'נועה כהן', className: 'י׳1', subject: 'מתמטיקה', percent: 18, note: 'עלייה מ־68% ל־86%' },
    { id: 's6', name: 'אדל פרץ', className: 'י״א2', subject: 'מתמטיקה', percent: 24, note: 'עלייה מ־57% ל־81%' },
    { id: 's11', name: 'אורי שגב', className: 'קבוצת אנגלית', subject: 'אנגלית', percent: 15, note: 'עלייה מ־72% ל־87%' }
  ]
};

export const mockTeacherQuestions = [
  {
    id: 'q1',
    text: 'האם הבנתן את הדוגמאות מהשיעור?',
    responses: 24,
    understanding: 87,
    createdAt: new Date(Date.now() - 2 * 60 * 60000),
    active: true
  },
  {
    id: 'q2',
    text: 'מה היה החלק המאתגר ביותר?',
    responses: 19,
    understanding: 0,
    createdAt: new Date(Date.now() - 1 * 60 * 60000),
    active: true
  },
  {
    id: 'q3',
    text: 'האם נדרש חידוד קצר לפני שיעור הבא?',
    responses: 28,
    understanding: 93,
    createdAt: new Date(Date.now() - 30 * 60000),
    active: true
  }
];

export const studentLists = [
  {
    id: 'list-1',
    name: 'כיתה י׳1 - תזמורת',
    students: [
      { id: 's1', name: 'נועה כהן' },
      { id: 's2', name: 'מאיה לוי' },
      { id: 's3', name: 'טליה ברק' },
      { id: 's4', name: 'יעל שמש' }
    ]
  },
  {
    id: 'list-2',
    name: 'כיתה י״א2 - מתמטיקה',
    students: [
      { id: 's5', name: 'מיכל רז' },
      { id: 's6', name: 'אדל פרץ' },
      { id: 's7', name: 'שירה טל' },
      { id: 's8', name: 'גל כהן' }
    ]
  },
  {
    id: 'list-3',
    name: 'קבוצת בוחן - אנגלית',
    students: [
      { id: 's9', name: 'רות בן דוד' },
      { id: 's10', name: 'ליהו אביטל' },
      { id: 's11', name: 'אורי שגב' }
    ]
  }
];
