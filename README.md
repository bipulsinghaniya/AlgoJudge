# 🚀 AlgoJudge – Online Coding Platform

AlgoJudge is a full-stack web application that allows users to practice coding problems, run code in multiple languages, and submit solutions with real-time feedback.

---

## 🌟 Features

* 🔐 **User Authentication**

  * Signup/Login with JWT authentication
  * Email verification using OTP (Redis-based)

* 🧠 **Coding Problem System**

  * Browse and solve coding problems
  * Multiple difficulty levels
  * Test case-based evaluation

* ⚡ **Code Execution**

  * Run code in multiple programming languages
  * Instant output for custom inputs

* 📊 **Submission System**

  * Submit solutions and get real-time feedback
  * Track submission results

* 👨‍💼 **Admin Panel**

  * Add/Delete problems
  * Upload problem statements and test cases

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS / DaisyUI
* Axios
* daisy ui

### Backend

* Node.js
* Express.js
* MongoDB
* Redis (for OTP verification)

### Other Tools

* JWT Authentication
* Nodemailer (for email OTP)
* Docker (optional)

---

## 🔄 Project Flow

1. User registers → OTP sent via email
2. OTP verified using Redis
3. User logs in → JWT token generated
4. User solves problems → submits code
5. Backend evaluates and returns result

---

## 📂 Folder Structure

```
AlgoJudge/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/
│   │   └── utils/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/bipulsinghaniya/AlgoJudge.git
cd AlgoJudge
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Environment Variables

Create `.env` file in backend:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
REDIS_URL=your_redis_url
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 📸 Screenshots

* Signup & Login Page
* OTP Verification
* Problem Dashboard
* Code Editor

---

## 🚀 Future Improvements

* 💳 Paid problems (Razorpay integration)
* 🧠 AI-based code suggestions
* 🏆 Leaderboard system
* 📱 Mobile responsiveness improvements

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📧 Contact

👤 **Bipul Singhaniya**
📩 [singhaniyabipul9@gmail.com](mailto:singhaniyabipul9@gmail.com)
🔗 GitHub: https://github.com/bipulsinghaniya

---

## ⭐ Support
If you like this project, please give it a ⭐ on GitHub!
