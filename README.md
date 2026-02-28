# 🚀 Review Management System - Team silentslayers

<div align="center">
  <h3>Centralized Review Intelligence for Multi-Branch Businesses</h3>
  <p>24-Hour Hackathon Project | Problem Statement 4</p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-18.x-green" alt="Node.js">
    <img src="https://img.shields.io/badge/Express-4.18-blue" alt="Express">
    <img src="https://img.shields.io/badge/MongoDB-8.0-brightgreen" alt="MongoDB">
    <img src="https://img.shields.io/badge/React-18.2-blue" alt="React">
    <img src="https://img.shields.io/badge/TailwindCSS-3.3-06B6D4" alt="TailwindCSS">
    <img src="https://img.shields.io/badge/PWA-Ready-purple" alt="PWA">
  </p>
</div>

---

## 📋 Table of Contents
- [Team Structure](#-team-structure)
- [Project Overview](#-project-overview)
- [Live Demos](#-live-demos)
- [Tech Stack](#-tech-stack)
- [Branch Structure](#-branch-structure)
- [Quick Start Guide](#-quick-start-guide)
- [Backend API Documentation](#-backend-api-documentation)
- [Features](#-features)
- [Folder Structure](#-folder-structure)
- [Database Schema](#-database-schema)
- [Deployment Guide](#-deployment-guide)
- [Team Workflow](#-team-workflow)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 👥 Team Structure

| Person | Role | Branch | Folder | Status |
|--------|------|--------|--------|--------|
| **Person A** | Backend Lead | `backend-dev` | `/backend` | ✅ Complete |
| **Person B** | Dashboard Lead | `dashboard-dev` | `/dashboard` | 🟡 In Progress |
| **Person C** | Mobile PWA Lead | `mobile-dev` | `/mobile-pwa` | 🟡 In Progress |
| **Person D** | AI Features Lead | `ai-dev` | `/ai-utils` | 🟡 In Progress |

---

## 🎯 Project Overview

**Problem Statement:** Multi-branch businesses receive reviews from multiple sources (Google, Zomato, internal forms, staff) but cannot manage them centrally. This leads to missed feedback, delayed responses, and poor customer experience.

**Our Solution:** A centralized system that:

| Feature | Description | Owner |
|---------|-------------|-------|
| 📱 **Mobile Collection** | QR code-based review form for customers | Person C |
| 🤖 **AI Analysis** | Auto sentiment detection + category tagging | Person D |
| 📊 **Admin Dashboard** | Real-time analytics + reply management | Person B |
| 🔧 **Backend API** | All data storage + processing + analytics | Person A |

### Key Benefits:
- ✅ Centralized view of all reviews across branches
- ✅ Automated sentiment analysis (Positive/Neutral/Negative)
- ✅ Auto-categorization (Food/Service/Staff/Ambience/Cleanliness)
- ✅ Real-time analytics dashboard
- ✅ AI-powered reply suggestions
- ✅ Instant alerts for negative reviews
- ✅ Branch-wise and staff-wise performance tracking

---

## 🌐 Live Demos

| Component | URL | Status |
|-----------|-----|--------|
| Backend API | `https://review-backend.onrender.com` | 🟢 Live |
| Admin Dashboard | `https://review-dashboard.vercel.app` | 🟡 Deploying |
| Mobile PWA | `https://review-mobile.vercel.app` | 🟡 Deploying |
| API Documentation | `/api-docs` (Swagger) | 🟢 Live |

---

## 🛠️ Tech Stack

### Backend (Person A)
```
Node.js + Express + MongoDB + Mongoose + express-validator + JWT + Swagger
```
- **Runtime:** Node.js 18+
- **Framework:** Express 4.18
- **Database:** MongoDB Atlas
- **ODM:** Mongoose 8.0
- **Validation:** express-validator
- **Documentation:** Swagger/OpenAPI
- **Deployment:** Render

### Frontend Dashboard (Person B)
```
React + Vite + TailwindCSS + Recharts + Axios + React Router
```
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Routing:** React Router
- **Deployment:** Vercel

### Mobile PWA (Person C)
```
React + Vite + PWA + QR Scanner + Service Workers
```
- **Framework:** React
- **PWA:** manifest.json + service worker
- **QR Scanner:** html5-qrcode
- **Offline Support:** Workbox
- **Deployment:** Vercel

### AI Utilities (Person D)
```
Node.js + OpenAI + NLP + Twilio + Sentiment
```
- **Sentiment:** Keyword-based + OpenAI fallback
- **Categories:** Pattern matching + ML
- **Replies:** GPT-3.5 suggestions
- **Alerts:** Twilio/SMS + Webhook
- **Testing:** Jest

---

## 🌿 Branch Structure

```
main (protected - production ready)
├── backend-dev    (Person A - Backend)    ✅ Active
├── dashboard-dev  (Person B - Dashboard)  🟡 Active
├── mobile-dev     (Person C - Mobile)     🟡 Active
└── ai-dev         (Person D - AI)         🟡 Active
```

### Branch Rules:
- ✅ Work ONLY in your assigned branch
- ✅ Work ONLY in your folder
- ✅ Commit only to your branch
- ✅ Pull before pushing
- ❌ Never push to main directly
- ❌ Never modify others' folders
- ❌ Never commit `.env` files

---

## 🚀 Quick Start Guide

### Prerequisites
```bash
Node.js v18+     # Check with: node -v
MongoDB Atlas    # Create free account at mongodb.com
Git              # Check with: git --version
```

### 1. Clone Repository
```bash
git clone https://github.com/ankitghosh1809/silentslayers-PS-4.git
cd silentslayers-PS-4
```

---

### 👤 Person A: Backend Setup

```bash
# Switch to your branch
git checkout backend-dev
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB URI
nano .env
# Add: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/review-system

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

**Backend runs at:** `http://localhost:8000`  
**API Base:** `http://localhost:8000/api`

---

### 👤 Person B: Dashboard Setup

```bash
# Switch to your branch
git checkout dashboard-dev
cd dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

**Dashboard runs at:** `http://localhost:5173`

---

### 👤 Person C: Mobile PWA Setup

```bash
# Switch to your branch
git checkout mobile-dev
cd mobile-pwa

# Install dependencies
npm install

# Start development server
npm run dev
```

**Mobile app runs at:** `http://localhost:5174`

---

### 👤 Person D: AI Utilities Setup

```bash
# Switch to your branch
git checkout ai-dev
cd ai-utils

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add OpenAI API key

# Test AI features
npm test
```

---

## 📡 Backend API Documentation

**Base URL:** `http://localhost:8000/api`  
**Live URL:** `https://review-backend.onrender.com/api`

### Authentication
Currently open for hackathon. Add JWT token in header:
```
Authorization: Bearer <token>
```

---

### 1. Create Review
```http
POST /review
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing food and excellent service! The staff was very friendly.",
  "branchId": "65f2a1b2c3d4e5f6a7b8c9d0",
  "staffId": "65f2a1b2c3d4e5f6a7b8c9d1"
}
```

**Response:**
```json
{
  "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
  "rating": 5,
  "comment": "Amazing food and excellent service! The staff was very friendly.",
  "categories": ["Food", "Service", "Staff Behavior"],
  "sentiment": "positive",
  "branchId": {
    "_id": "65f2a1b2c3d4e5f6a7b8c9d0",
    "name": "Downtown",
    "location": "123 Main St"
  },
  "staffId": {
    "_id": "65f2a1b2c3d4e5f6a7b8c9d1",
    "name": "John Doe",
    "role": "Server"
  },
  "reply": "",
  "createdAt": "2024-03-14T10:30:00.000Z"
}
```

---

### 2. Get All Reviews (Paginated)
```http
GET /reviews?page=1&limit=10
GET /reviews?branchId=65f2a1b2c3d4e5f6a7b8c9d0
GET /reviews?page=2&limit=10&branchId=65f2a1b2c3d4e5f6a7b8c9d0
```

**Response:**
```json
{
  "total": 150,
  "page": 1,
  "totalPages": 15,
  "data": [
    {
      "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
      "rating": 5,
      "comment": "Amazing food!",
      "categories": ["Food"],
      "sentiment": "positive",
      "branchId": { 
        "_id": "65f2a1b2c3d4e5f6a7b8c9d0",
        "name": "Downtown" 
      },
      "staffId": { 
        "_id": "65f2a1b2c3d4e5f6a7b8c9d1",
        "name": "John Doe", 
        "role": "Server" 
      },
      "reply": "",
      "createdAt": "2024-03-14T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Update Reply
```http
PUT /reply/65f2a1b2c3d4e5f6a7b8c9d2
Content-Type: application/json

{
  "reply": "Thank you for your feedback! We're glad you enjoyed your experience."
}
```

**Response:**
```json
{
  "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
  "rating": 5,
  "comment": "Amazing food!",
  "categories": ["Food"],
  "sentiment": "positive",
  "branchId": { "name": "Downtown" },
  "staffId": { "name": "John Doe" },
  "reply": "Thank you for your feedback! We're glad you enjoyed your experience.",
  "createdAt": "2024-03-14T10:30:00.000Z"
}
```

---

### 4. Get Analytics
```http
GET /analytics
GET /analytics?branchId=65f2a1b2c3d4e5f6a7b8c9d0
```

**Response:**
```json
{
  "overview": {
    "totalReviews": 150,
    "averageRating": 4.2,
    "sentimentBreakdown": {
      "positive": 98,
      "neutral": 32,
      "negative": 20
    }
  },
  "branchWise": [
    {
      "branchName": "Downtown",
      "avgRating": 4.5,
      "totalReviews": 50
    },
    {
      "branchName": "Uptown",
      "avgRating": 4.0,
      "totalReviews": 50
    },
    {
      "branchName": "Suburbs",
      "avgRating": 4.1,
      "totalReviews": 50
    }
  ],
  "monthlyTrend": [
    {
      "month": "2024-10",
      "avgRating": 4.1,
      "totalReviews": 25
    },
    {
      "month": "2024-11",
      "avgRating": 4.3,
      "totalReviews": 30
    }
  ],
  "staffPerformance": [
    {
      "name": "John Doe",
      "role": "Server",
      "avgRating": 4.8,
      "totalReviews": 25,
      "responseRate": 85
    }
  ]
}
```

---

## ✨ Features Status

### ✅ Completed (Person A - Backend)
- [x] Express server with MongoDB connection
- [x] Branch, Staff, Review models
- [x] GET /reviews with pagination
- [x] Database seeded with 50+ reviews (5 branches, 19 staff)
- [x] Auto sentiment detection (positive/neutral/negative)
- [x] Auto category tagging (Food/Service/Ambience/Cleanliness/Staff/Value/Wait Time)
- [x] POST /review endpoint with validation
- [x] PUT /reply/:reviewId endpoint
- [x] GET /analytics with full aggregation
- [x] Input validation with express-validator
- [x] Error handling middleware
- [x] Branch filtering on reviews
- [x] Swagger API documentation
- [x] Deployment ready

### 🟡 In Progress (Person B - Dashboard)
- [ ] Admin dashboard layout
- [ ] Reviews table with filters
- [ ] Analytics charts (Recharts)
- [ ] Reply drawer/modal
- [ ] Branch selector
- [ ] API integration

### 🟡 In Progress (Person C - Mobile)
- [ ] QR code scanner
- [ ] Star rating component
- [ ] Category selector
- [ ] Review submission form
- [ ] Success page
- [ ] PWA manifest

### 🟡 In Progress (Person D - AI)
- [ ] OpenAI integration
- [ ] Smart reply suggestions
- [ ] WhatsApp alerts for negative reviews
- [ ] Enhanced sentiment analysis
- [ ] Category optimization

---

## 📂 Folder Structure

```
silentslayers-PS-4/
│
├── backend/                 (Person A)
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── models/
│   │   ├── Branch.js
│   │   ├── Staff.js
│   │   └── Review.js
│   ├── controllers/
│   │   ├── reviewController.js
│   │   └── analyticsController.js
│   ├── routes/
│   │   ├── reviewRoutes.js
│   │   └── analyticsRoutes.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── utils/
│   │   ├── sentiment.js
│   │   └── categories.js
│   ├── config/
│   │   └── db.js
│   └── seed/
│       └── seed.js
│
├── dashboard/               (Person B)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Reviews.jsx
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ReplyDrawer.jsx
│   │   │   └── Charts.jsx
│   │   └── services/
│   │       └── api.js
│   └── public/
│
├── mobile-pwa/              (Person C)
│   ├── index.html
│   ├── package.json
│   ├── manifest.json
│   ├── sw.js
│   └── src/
│       ├── App.jsx
│       ├── pages/
│       │   ├── Scan.jsx
│       │   ├── ReviewForm.jsx
│       │   └── Success.jsx
│       └── components/
│           ├── StarRating.jsx
│           └── CategorySelector.jsx
│
├── ai-utils/                (Person D)
│   ├── package.json
│   ├── sentiment.js
│   ├── categories.js
│   ├── replyGenerator.js
│   ├── alertSystem.js
│   └── tests/
│       └── ai.test.js
│
├── README.md
└── .gitignore
```

---

## 📊 Database Schema

### Branch Collection
```javascript
{
  _id: ObjectId,
  name: String,        // "Downtown"
  location: String,     // "123 Main St"
  manager: String,      // "John Smith"
  createdAt: Date,
  updatedAt: Date
}
```

### Staff Collection
```javascript
{
  _id: ObjectId,
  name: String,         // "Jane Doe"
  branchId: ObjectId,   // Reference to Branch
  role: String,         // "Server", "Chef", "Manager"
  createdAt: Date,
  updatedAt: Date
}
```

### Review Collection
```javascript
{
  _id: ObjectId,
  rating: Number,        // 1-5
  comment: String,       // Review text
  categories: [String],  // ["Food", "Service"]
  sentiment: String,     // "positive", "neutral", "negative"
  branchId: ObjectId,    // Reference to Branch
  staffId: ObjectId,     // Reference to Staff
  reply: String,         // Admin reply (default: "")
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚢 Deployment Guide

### Backend (Render)

```bash
# 1. Push to backend-dev branch
git add .
git commit -m "Ready for deployment"
git push origin backend-dev

# 2. Go to render.com
# 3. Click "New +" → "Web Service"
# 4. Connect GitHub repository
# 5. Select branch: backend-dev
# 6. Root Directory: backend
# 7. Build Command: npm install
# 8. Start Command: npm start
# 9. Add Environment Variables:
#    - MONGO_URI = your_mongodb_connection_string
#    - PORT = 8000
#    - NODE_ENV = production
# 10. Click "Create Web Service"
```

**Live URL:** `https://review-backend.onrender.com`

---

### Frontend Dashboard (Vercel)

```bash
# 1. Push to dashboard-dev branch
git push origin dashboard-dev

# 2. Go to vercel.com
# 3. Import GitHub repository
# 4. Select branch: dashboard-dev
# 5. Root Directory: dashboard
# 6. Build Command: npm run build
# 7. Output Directory: dist
# 8. Add Environment Variables:
#    - VITE_API_URL = https://review-backend.onrender.com/api
# 9. Click "Deploy"
```

**Live URL:** `https://review-dashboard.vercel.app`

---

### Mobile PWA (Vercel)

```bash
# 1. Push to mobile-dev branch
git push origin mobile-dev

# 2. Go to vercel.com
# 3. Import GitHub repository
# 4. Select branch: mobile-dev
# 5. Root Directory: mobile-pwa
# 6. Build Command: npm run build
# 7. Output Directory: dist
# 8. Add Environment Variables:
#    - VITE_API_URL = https://review-backend.onrender.com/api
# 9. Click "Deploy"
```

**Live URL:** `https://review-mobile.vercel.app`

---

## 👥 Team Workflow

### Daily Routine

```bash
# Start your day
git checkout your-branch-name
git pull origin your-branch-name

# Make changes in YOUR folder only

# End of day
git add .
git commit -m "Description of changes made"
git push origin your-branch-name
```

### Before Push Checklist
- [ ] Working only in your branch?
- [ ] Working only in your folder?
- [ ] Code tested locally?
- [ ] No `.env` file committed?
- [ ] Added meaningful commit message?

### Integration Schedule
| Time | Activity |
|------|----------|
| Hour 16 | Merge all branches to main |
| Hour 18 | Integration testing |
| Hour 20 | Bug fixes |
| Hour 22 | Final deployment |
| Hour 24 | Demo preparation |

---

## 📸 Screenshots

### Admin Dashboard
```
[Dashboard View - Stats Cards + Charts]
[Reviews Table View]
[Reply Drawer]
```

### Mobile App
```
[QR Scanner]
[Review Form with Stars]
[Success Screen]
```

### Analytics
```
[Sentiment Pie Chart]
[Branch Performance Bar Chart]
[Monthly Trends Line Chart]
[Staff Performance Table]
```

---

## 🧪 Sample Data

After seeding, you'll have:

### Branches (5)
- Downtown - 123 Main St (Manager: John Smith)
- Uptown - 456 North Ave (Manager: Sarah Johnson)
- Suburbs - 789 South Rd (Manager: Michael Brown)
- Riverside - 321 East Dr (Manager: Emily Davis)
- Business District - 654 West Blvd (Manager: David Wilson)

### Staff (19)
- Managers: 5
- Chefs: 5
- Servers: 7
- Hosts: 2

### Reviews (50+)
- Ratings: 1-5 stars
- Varied sentiments
- Different categories
- Spread across last 90 days

---

## 🤝 Contributing

### For Team Members

1. **Clone the repo**
```bash
git clone https://github.com/ankitghosh1809/silentslayers-PS-4.git
cd silentslayers-PS-4
```

2. **Switch to your branch**
```bash
git checkout your-branch-name
```

3. **Work in your folder only**
```bash
cd your-folder-name
```

4. **Commit and push**
```bash
git add .
git commit -m "Your message"
git push origin your-branch-name
```

### Code Style Guidelines
- **Backend:** Use ES6 modules, async/await, proper error handling
- **Frontend:** Functional components, hooks, Tailwind classes
- **AI:** Pure functions, proper error handling, fallbacks

---

## 🚨 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check MongoDB connection
mongod --version
# Verify .env file exists
ls -la .env
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Git push rejected:**
```bash
# Pull latest changes first
git pull origin your-branch-name
# Resolve conflicts
# Then push again
git push origin your-branch-name
```

**Port already in use:**
```bash
# Find process using port
lsof -i :8000
# Kill process
kill -9 <PID>
```

---

## 📞 Contact

**Team silentslayers**

| Person | Role | Branch | GitHub |
|--------|------|--------|--------|
| Person A | Backend Lead | `backend-dev` | @username |
| Person B | Dashboard Lead | `dashboard-dev` | @username |
| Person C | Mobile Lead | `mobile-dev` | @username |
| Person D | AI Lead | `ai-dev` | @username |

**Project Repository:** https://github.com/ankitghosh1809/silentslayers-PS-4

---

## 📅 Hackathon Timeline

| Time | Milestone | Status |
|------|-----------|--------|
| 0-2 hrs | Setup + Architecture | ✅ Complete |
| 2-10 hrs | Parallel Development | 🟡 In Progress |
| 10-16 hrs | Integration | ⏳ Pending |
| 16-20 hrs | Polish + Testing | ⏳ Pending |
| 20-22 hrs | Deployment | ⏳ Pending |
| 22-24 hrs | Demo Prep | ⏳ Pending |

---

## 🙏 Acknowledgments

- Hackathon organizers for the opportunity
- Mentors for guidance
- Open source community for amazing tools
- Team members for hard work and collaboration

---

## 📝 License

This project is created for educational purposes as part of a 24-hour hackathon.

© 2024 Team silentslayers. All rights reserved.

---

<div align="center">
  <p>⚡ Built with speed for 24-Hour Hackathon ⚡</p>
  <p>Problem Statement 4 - Review Management System</p>
  <p>
    <sub>Last updated: February 28, 2024</sub>
  </p>
</div>
```

---

## 📋 HOW TO ADD THIS FILE

```bash
cd ~/Desktop/silentslayers-PS-4
nano README.md
# 1. Copy ALL the content above
# 2. Paste in nano (Cmd+V)
# 3. Save: Ctrl+O, then Enter
# 4. Exit: Ctrl+X

# Add to git
git add README.md
git commit -m "Add comprehensive project README with team structure and API docs"
git push origin main
```
