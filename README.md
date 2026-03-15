# AlgoJudge 🚀

AlgoJudge is a **full-stack online coding judge platform** where users can solve programming problems, write code in multiple languages, and get results based on test cases — similar to platforms like **LeetCode or HackerRank**.

The platform provides a seamless interface for browsing problems, writing code, running test cases, and submitting solutions.

---

# 🌐 Live Demo

Frontend:  
https://algojudge-frontend.onrender.com

---

# ✨ Features

## 👨‍💻 Problem Solving Platform
- Browse coding problems
- View problem description with examples
- Filter problems by **difficulty** and **tags**

## 🧠 Online Code Editor
- Built-in code editor for solving problems
- Supports multiple programming languages:
  - JavaScript
  - Java
  - C++

## ⚡ Code Execution
- Run code against test cases
- Submit solutions for evaluation
- Display execution results

## 📊 Submission System
- Tracks user submissions
- Displays submission status
- Shows solved problems

## 🔐 Authentication System
- Secure user authentication using **JWT**
- Login and signup functionality
- Protected routes

## 🚪 Logout System
- Logout functionality with **Redis token invalidation**
- Prevents reuse of old tokens

## 🎯 Problem Filtering
Users can filter problems by:
- Difficulty
- Tags
- Problem categories

## 🧾 User Dashboard
- Displays solved problems
- Personalized coding interface

---

# 🛠 Tech Stack

## Frontend
- React.js
- Redux Toolkit
- Axios
- Tailwind CSS
- React Router

## Backend
- Node.js
- Express.js
- MongoDB
- Redis
- JWT Authentication

## Code Execution
- Docker based isolated execution environment
- Multi-language code execution

## Deployment
- Frontend: Render
- Backend: Render

---

# 📂 Project Structure

```
AlgoJudge
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── store
│   │   ├── utils
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── index.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/bipulsinghaniya/AlgoJudge.git
cd AlgoJudge
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
```

Run backend:

```bash
npm start
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📸 Screenshots

### Problem List Page
(Add screenshot here)

### Code Editor
(Add screenshot here)

### Submission Result
(Add screenshot here)

---

# 🚀 Future Improvements

- Add more programming languages
- Contest mode
- Leaderboard system
- Editorial solutions
- AI code feedback
- Performance analytics

---

# 👨‍💻 Author

**Bipul Singhaniya**

B.Tech Computer Science  
Lovely Professional University (LPU)

GitHub:  
https://github.com/bipulsinghaniya

Portfolio:  
https://bipul-portfolio-tzyl.vercel.app/

---

# ⭐ Support

If you like this project, please **give it a star ⭐ on GitHub**.
