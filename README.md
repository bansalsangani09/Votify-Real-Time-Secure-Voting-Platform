# ✨ Votify: Secure Real-Time Voting Platform

Votify is a full-stack, real-time voting platform designed to provide a secure, scalable, and user-friendly election experience. It combines modern web technologies with robust backend architecture to deliver seamless voting, live updates, notifications, email alerts, and reliable data management.

## 🌐 Live Demo

* **Frontend:** https://votify-eta.vercel.app/
* **Backend API:** https://votify-backend-z5x1.onrender.com
* **Source Code:** [https://github.com/bansalsangani09/Votify — Real Time Secure Voting Platform.git](https://github.com/bansalsangani09/Votify-Real-Time-Secure-Voting-Platform)

---

# 🚀 Features

## 🛡️ Authentication & Security

* JWT-based authentication
* Sign in with Google (Google OAuth)
* Email verification during account registration
* reCAPTCHA protection
* Role-based access control (Admin/User)
* Rate limiting and security middleware
* Password hashing with BCrypt

## ⚡ Real-Time System

* Live voting updates using Socket.IO
* Instant notifications for users and admins while the website is open
* Event-driven architecture
* Seamless experience without page refresh

## 🔔 Notification System

### Real-Time Notifications (Website Open)

Notifications are delivered instantly through Socket.IO when users are actively connected to the platform.

* User joins an election
* Election status changes from Upcoming to Live
* Election creation notifications
* Voting activity updates
* Administrative announcements and system events

### Email Notifications

Email notifications are sent regardless of whether the user is currently online.

* Email verification during account registration
* Vote confirmation email after successfully casting a vote
* Important election-related updates

## 🧠 Backend Architecture

* Modular service-based architecture
* Controller → Service → Model pattern
* Global error handling middleware
* Transaction queue for reliable processing
* Scalable and maintainable codebase

## ✅ API Validation

* Joi validation middleware
* Request validation for body, params, and query
* Structured error responses
* Protection against invalid inputs

## 📊 Data Management

* MongoDB for application data storage
* Audit logs for transparency
* Efficient data access and persistence

---

# 🛠️ Tech Stack

| Layer      | Technologies                                        |
| ---------- | --------------------------------------------------- |
| Frontend   | React (Vite), Tailwind CSS, Framer Motion, Recharts |
| Backend    | Node.js, Express.js, MongoDB, Socket.IO             |
| Security   | JWT, Google OAuth, reCAPTCHA, Helmet, BCrypt        |
| Validation | Joi                                                 |

---

# 🏗️ System Architecture

### Frontend

* Interactive dashboard for voters and administrators
* Real-time notifications and results
* Responsive user interface

### Backend

* Handles authentication and business logic
* REST APIs for voting workflows
* WebSocket communication for real-time updates
* Email notification services
* Election and notification management

### Database

* Stores users, elections, voting records, notifications, and audit logs
* Provides fast and reliable access to data

---

# 📁 Project Structure

```text
Votify/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── routes/
│   │   └── utils/
│   └── app.js
├── frontend/
│   ├── src/
│   |   ├── admin/
│   |   ├── assets/
│   |   ├── components/
│   |   ├── context/
│   |   ├── pages/
│   |   ├── utils/
│   |   ├── voter/
│   |   ├── App.jsx
|   |   ├── main.jsx
│   |   └── style.css
│   │── assets/
│   │── public/
│   │── index.html
│   │── vercel.json
│   │── tsconfig.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

# 🔄 Request Flow

1. Client sends request
2. Authentication middleware verifies user
3. Joi validation validates request data
4. Controller handles request
5. Service layer processes business logic
6. Database operations are performed
7. Socket.IO emits real-time notifications and updates
8. Email notifications are triggered when required

---

# ⚙️ Installation

## Prerequisites

* Node.js (v16+)
* MongoDB

## Clone Repository

```bash
git clone https://github.com/bansalsangani09/Votify-Secure-Voting-System
cd Votify-Secure-Voting-System
```

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

# Environment Variables

### backend/.env

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
```

---

# Run Backend

```bash
npm run dev
```

# Run Frontend

```bash
npm run dev
```

---

# 🌐 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |

---

# 📌 Highlights

* Real-time voting system powered by Socket.IO
* Sign in with Google authentication
* Email verification system
* Vote confirmation email notifications
* Real-time election notifications
* Production-level backend architecture
* Secure authentication and authorization
* Modular and scalable design
* Robust validation and error handling
* Responsive React frontend

---

# 🚀 Future Improvements

* Advanced analytics dashboard
* Multi-election scalability
* Performance optimization and caching
* Admin insights and reports
* Browser push notifications for users even when the website is not open

---

# 👨‍💻 Author

**Bansal Sangani**

GitHub: https://github.com/bansalsangani09

---

# 📜 License

This project is licensed under the MIT License.