# מערכת המשוב החינוכית
## Educational Feedback System

> "לא תחושות – נתונים. לא בדיקה – הבנה."

מערכת מודרנית לאסיפת משוב אמיתי ממורות ותלמידות, עם ניתוח נתונים מתקדם למנהלות.

---

## 🎯 תיאור המערכת

מערכת זו פותרת את הבעיה הגדולה בחינוך: **הדיוק של המידע**.

בסוף יום לימודים רגיל, מורה לא יודעת בדיוק:
- באיזה כיתה באמת הבינו?
- איפה היה הקושי הגדול?
- ואצל איזו מורה זה עבד הכי טוב?

**מערכת זו נוצרה בדיוק לרגע הזה.**

---

## 👥 המשתתפים בחלק

### 🧑‍🏫 המורה
- בוחרת 2-3 שאלות קצרות לפני/אחרי השיעור
- כל תלמידה עונה באנונימיות מעמדה
- זמן התשובה: פחות מדקה
- אין לחץ, אין ציונים, רק שאלה ברורה

### 👧 התלמידה
- אין כאן מבחן
- אין ציון
- רק שאלה אחת ברורה: **"האם הבנתי?"**
- אנונימיות מלאה ⟹ כנות

### 👩‍💼 המנהלת
- לא תחושות – **נתונים**
- פילוח לפי: כיתות, מקצועות, מורות, תקופה
- לא כדי לבקר – כדי לדעת איפה לחזק, איפה להצליח

---

## 🏗 ארכיטקטורה

```
מערכת המשוב
├── Server (Node.js + Express)
│   ├── Authentication (JWT)
│   ├── Question Management
│   ├── Response Collection
│   └── Analytics Engine
├── Database (MongoDB)
│   ├── Users
│   ├── Questions
│   └── Responses
└── Frontend (React)
    ├── Login Page
    ├── Teacher Dashboard
    ├── Student Response Page
    └── Admin Analytics Dashboard
```

---

## 🚀 התחלת עבודה

### דרישות מוקדמות
- Node.js 14+
- MongoDB (מושקה ופעילה)
- npm או yarn

### התקנה

1. **התקן דפנדנסיים בשרת:**
```bash
cd server
npm install
```

2. **התקן דפנדנסיים בקליינט:**
```bash
cd client
npm install
```

### קונפיגורציה

1. **בשרת** – צור `.env` מ-`.env.example`:
```bash
cp .env.example .env
```

ערוך את הערכים לפי צרכך:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-system
NODE_ENV=development
JWT_SECRET=your_secure_key
CORS_ORIGIN=http://localhost:3000
```

### הרצה

**טרמינל 1 – השרת:**
```bash
cd server
npm run dev
```

**טרמינל 2 – הקליינט:**
```bash
cd client
npm start
```

המערכת תהיה זמינה ב:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

---

## 📊 תכונות

### 🔐 ניהול משתמשים
- הרשמה והתחברות מאובטחת עם JWT
- שלוש רמות משתמש: מורה, תלמידה, מנהלת

### ❓ ניהול שאלות
- יצירת שאלות מורכבות:
  - כן/לא
  - סקלה 1-5
  - בחירה מרובה
  - טקסט פתוח
- ניהול שאלות פעילות

### 📝 אסיפת תשובות
- אנונימיות מלאה
- ללא לחץ
- קלה וברורה

### 📈 ניתוח נתונים
- סטטיסטיקות לפי:
  - **כיתה** – הבנה ממוצעת, מספר תשובות
  - **מורה** – ביצוע וטרנדים
  - **מקצוע** – התפלגות הנושאים
  - **תקופה** – ניתוח זמני

---

## 🛣️ API Routes

### Authentication
- `POST /api/auth/register` – הרשמה
- `POST /api/auth/login` – התחברות

### Questions
- `GET /api/questions/active/:classId` – שאלות פעילות
- `POST /api/questions` – יצירת שאלה
- `PATCH /api/questions/:id/deactivate` – ביטול שאלה

### Responses
- `POST /api/responses` – שליחת תשובה
- `GET /api/responses/question/:questionId` – קבלת תשובות

### Analytics
- `GET /api/analytics/by-class/:classId` – ניתוח לפי כיתה
- `GET /api/analytics/by-teacher/:teacherId` – ניתוח לפי מורה
- `GET /api/analytics/by-subject/:subject` – ניתוח לפי מקצוע
- `GET /api/analytics/by-period/:startDate/:endDate` – ניתוח לפי תקופה

---

## 🎨 ממשק משתמש

### עמוד התחברות
- עיצוב מודרני וגראדיאנט
- קלט דוא"ל וסיסמה

### עמוד מורה
- יצירת שאלות חדשות
- ניהול שאלות פעילות
- צפייה בכמות התשובות

### עמוד תלמידה
- שאלה אחת ברורה בכל פעם
- תשובה מהירה (כן/לא)
- הודעת אישור

### לוח ניהול
- גרפים אינטראקטיביים
- נתונים מפורטים
- תובנות ודיווחים

---

## 📁 מבנה הפרויקט

```
פרויקט/
├── server/
│   ├── src/
│   │   ├── server.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middleware/
│   ├── package.json
│   └── .env.example
└── client/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   ├── App.js
    │   └── index.js
    ├── public/
    └── package.json
```

---

## 🔧 פיתוח

### הוספת תכונות חדשות

1. **שרת:** הוסף endpoint חדש ב-`routes/`
2. **מסד נתונים:** עדכן/הוסף schema ב-`models/`
3. **קליינט:** הוסף קומפוננטה ב-`pages/` או `components/`
4. **שירות:** עדכן את קבצי `services/`

### טיפול בשגיאות

כל request כולל:
- Error handling
- Proper HTTP status codes
- Meaningful error messages

---

## 📝 רשימות בדיקה

- [ ] MongoDB פעיל ובקישור מוצלח
- [ ] שתי הטרמינלים פועלות (server + client)
- [ ] התחברות עם בדיקה משתמש
- [ ] יצירת שאלה מעמוד המורה
- [ ] תשובה מעמוד התלמידה
- [ ] צפייה בדיווח מעמוד הניהול

---

## 🤝 תרומה

פרויקט זה פתוח לשיפורים ותיקונים. 

---

## 📦 הכנה לעלות ל-GitHub / פריסה

- העתק/מלא קבצי `.env` לפי `.env.example` בכל סביבת עבודה לפני דחיפה או פריסה.
- ודא שה־`client` נבנה לפני פריסה: `cd client && npm run build`.
- השרת מוגדר לשרת את ה־`build/` כש־`NODE_ENV=production` (ראה `server/src/server.js`).
- הקבצים הרגישים כמו `.env` כבר ב־`.gitignore` ולא יידחפו.
- להרצות בדיקות ולנקות בעיות אבטחה לפני דחיפה:
```bash
cd server
npm test
npm audit fix
cd ../client
npm audit fix
npm run build
```


## 📄 רישיון

MIT License

---

## 💡 ביטוי זהב להצגה

> "אם היום הייתה לך אפשרות לדעת, כבר מחר בבוקר, איפה צריך חיזוק ואיפה יש הצלחה – היית משתמשת בזה?"

*(חיוך, שקט)*

---

**נכתב בלב ❤️ לחינוך טוב יותר**
