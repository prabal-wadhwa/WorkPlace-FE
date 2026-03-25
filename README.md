# 🎯 WorkPlace Frontend (Task Management App)

A modern and interactive **Task Management Web App** inspired by Trello — built using React with drag-and-drop functionality and clean UI.

---

## 🚀 Features

* 🔐 **Authentication**

  * Login / Signup
  * Session handling

* 📋 **Task Management**

  * Add Task
  * Edit Task
  * Delete Task
  * Bulk Delete

* 🧠 **Smart Task Handling**

  * Priority (High / Medium / Low)
  * Category & Description
  * Due Date & Time Estimation
  * Repeat Tasks

* 📊 **Task Views**

  * Grid View (Home Page)
  * Kanban Board (Drag & Drop)

* 🔄 **Drag & Drop (Trello-like)**

  * Move tasks across columns
  * Auto status update

* 🎨 **Modern UI**

  * Responsive design
  * Glassmorphism effects
  * Smooth animations

---

## 🛠 Tech Stack

* React (Vite)
* JavaScript (ES6+)
* CSS (Custom Styling)
* React Router
* Drag & Drop: @hello-pangea/dnd

---

## 📂 Project Structure

```id="fe_struct"
src/
├── api/
│   ├── client.js
│   ├── authApi.js
│   └── taskApi.js
│
├── components/
│   ├── common/
│   │   └── SuccessModal.jsx
│   └── layout/
│       └── NavBar.jsx
│
├── screens/
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── index.js
│   │
│   ├── task/
│   │   ├── HomePage.jsx
│   │   ├── TaskBoard.jsx
│   │   ├── AddTask.jsx
│   │   └── styles/
│
├── common/
│   └── utils.js
│
├── routes/
│   └── AppRoutes.jsx
│
├── App.jsx
├── main.jsx
└── .env
```

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```id="fe_env"
VITE_API_URL=http://localhost:4000
```

---

## 📦 Installation

```bash id="fe_install"
git clone https://github.com/prabal-wadhwa/WorkPlace-FE.git
cd WorkPlace-FE
npm install
npm run dev
```

---

## 🔗 API Integration

The frontend communicates with backend APIs using a centralized API layer:

* `/auth/*` → Authentication
* `/tasks/*` → Task operations

---

## 🧠 App Flow

```id="fe_flow"
User → Login
     → HomePage (Task List)
     → Add / Edit Task
     → Task Board (Drag & Drop)
     → Backend Sync
```

## 🚀 Future Improvements

* 🔔 Notifications
* 📡 Real-time updates (WebSockets)
* 🧠 Filters & advanced search
* 📊 Analytics dashboard
* 🌙 Dark/Light mode toggle

---

## 👨‍💻 Author

**Prabal Wadhwa**

---

## ⭐ Support

If you like this project, don’t forget to give it a ⭐ on GitHub!
