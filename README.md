<<<<<<< HEAD
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
=======
# 🚀 Backend API - Review Management System

<div align="center">
  <h3>Person A | Backend Lead</h3>
  <p>Node.js + Express + MongoDB</p>
  <p>
    <a href="#-api-endpoints">API Docs</a> •
    <a href="#-installation">Setup</a> •
    <a href="#-database-models">Models</a> •
    <a href="#-deployment">Deploy</a>
>>>>>>> backend
  </p>
</div>

---

## 📋 Table of Contents
<<<<<<< HEAD
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
=======
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Environment Setup](#-environment-setup)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Features Implemented](#-features-implemented)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Team Integration](#-team-integration)
- [Scripts](#-scripts)
- [Error Handling](#-error-handling)
- [Dependencies](#-dependencies)

---

## 📌 Overview

This is the backend API for the Review Management System. It handles:
- 📝 Customer review submission
- 🤖 Auto sentiment analysis (positive/neutral/negative)
- 🏷️ Auto category detection (Food/Service/Staff/Ambience/Cleanliness)
- 🏢 Branch & staff management
- 📊 Analytics aggregation
- 💬 Reply management

**Base URL:** `http://localhost:8000/api`  
**Live URL:** `https://your-backend.onrender.com/api`
>>>>>>> backend

---

## 🛠️ Tech Stack

<<<<<<< HEAD
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
=======
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| express-validator | Input Validation |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment Variables |
| nodemon | Development Auto-restart |

---

## 📂 Folder Structure

```
backend/
│
├── server.js                 # Entry point
├── package.json
├── .env.example              # Environment variables template
│
├── models/
│   ├── Branch.js             # Branch schema
│   ├── Staff.js              # Staff schema
│   └── Review.js             # Review schema
│
├── controllers/
│   ├── reviewController.js   # Review CRUD operations
│   └── analyticsController.js # Analytics aggregation
│
├── routes/
│   ├── reviewRoutes.js        # Review endpoints
│   └── analyticsRoutes.js     # Analytics endpoints
│
├── middleware/
│   ├── errorMiddleware.js     # Global error handler
│   └── validationMiddleware.js # Input validation
│
├── utils/
│   ├── sentiment.js           # Auto sentiment detection
│   └── categories.js          # Auto category tagging
│
├── config/
│   └── db.js                  # Database connection
│
└── seed/
    └── seed.js                 # Database seeder
>>>>>>> backend
```

---

<<<<<<< HEAD
### 👤 Person A: Backend Setup

```bash
# Switch to your branch
git checkout backend-dev
=======
## 🔧 Environment Setup

Create a `.env` file in the root of backend folder:

```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/review-system
NODE_ENV=development
```

---

## 📦 Installation

```bash
# Navigate to backend folder
>>>>>>> backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
<<<<<<< HEAD

# Edit .env with your MongoDB URI
nano .env
# Add: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/review-system
=======
# Edit .env with your MongoDB URI
>>>>>>> backend

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

<<<<<<< HEAD
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
=======
**Server will run at:** `http://localhost:8000`

---

## 📡 API Endpoints

### 1. Create a Review
```http
POST /api/review
>>>>>>> backend
Content-Type: application/json

{
  "rating": 5,
<<<<<<< HEAD
  "comment": "Amazing food and excellent service! The staff was very friendly.",
=======
  "comment": "Amazing food and excellent service!",
>>>>>>> backend
  "branchId": "65f2a1b2c3d4e5f6a7b8c9d0",
  "staffId": "65f2a1b2c3d4e5f6a7b8c9d1"
}
```

**Response:**
```json
{
  "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
  "rating": 5,
<<<<<<< HEAD
  "comment": "Amazing food and excellent service! The staff was very friendly.",
  "categories": ["Food", "Service", "Staff Behavior"],
=======
  "comment": "Amazing food and excellent service!",
  "categories": ["Food", "Service"],
>>>>>>> backend
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
<<<<<<< HEAD
GET /reviews?page=1&limit=10
GET /reviews?branchId=65f2a1b2c3d4e5f6a7b8c9d0
GET /reviews?page=2&limit=10&branchId=65f2a1b2c3d4e5f6a7b8c9d0
=======
GET /api/reviews?page=1&limit=10
GET /api/reviews?branchId=65f2a1b2c3d4e5f6a7b8c9d0
GET /api/reviews?page=2&limit=10&branchId=65f2a1b2c3d4e5f6a7b8c9d0
>>>>>>> backend
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
<<<<<<< HEAD
PUT /reply/65f2a1b2c3d4e5f6a7b8c9d2
Content-Type: application/json

{
  "reply": "Thank you for your feedback! We're glad you enjoyed your experience."
=======
PUT /api/reply/65f2a1b2c3d4e5f6a7b8c9d2
Content-Type: application/json

{
  "reply": "Thank you for your feedback! We appreciate your input."
>>>>>>> backend
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
<<<<<<< HEAD
  "reply": "Thank you for your feedback! We're glad you enjoyed your experience.",
=======
  "reply": "Thank you for your feedback! We appreciate your input.",
>>>>>>> backend
  "createdAt": "2024-03-14T10:30:00.000Z"
}
```

---

### 4. Get Analytics
```http
<<<<<<< HEAD
GET /analytics
GET /analytics?branchId=65f2a1b2c3d4e5f6a7b8c9d0
=======
GET /api/analytics
GET /api/analytics?branchId=65f2a1b2c3d4e5f6a7b8c9d0
>>>>>>> backend
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
<<<<<<< HEAD
=======
    },
    {
      "month": "2024-12",
      "avgRating": 4.2,
      "totalReviews": 28
    },
    {
      "month": "2025-1",
      "avgRating": 4.4,
      "totalReviews": 32
    },
    {
      "month": "2025-2",
      "avgRating": 4.0,
      "totalReviews": 35
>>>>>>> backend
    }
  ],
  "staffPerformance": [
    {
      "name": "John Doe",
      "role": "Server",
      "avgRating": 4.8,
      "totalReviews": 25,
      "responseRate": 85
<<<<<<< HEAD
=======
    },
    {
      "name": "Jane Smith",
      "role": "Chef",
      "avgRating": 4.7,
      "totalReviews": 20,
      "responseRate": 0
    },
    {
      "name": "Bob Johnson",
      "role": "Manager",
      "avgRating": 4.5,
      "totalReviews": 15,
      "responseRate": 100
>>>>>>> backend
    }
  ]
}
```

---

<<<<<<< HEAD
## ✨ Features Status

### ✅ Completed (Person A - Backend)
- [x] Express server with MongoDB connection
- [x] Branch, Staff, Review models
- [x] GET /reviews with pagination
- [x] Database seeded with 50+ reviews (5 branches, 19 staff)
- [x] Auto sentiment detection (positive/neutral/negative)
- [x] Auto category tagging (Food/Service/Ambience/Cleanliness/Staff/Value/Wait Time)
=======
## 📊 Database Models

### Branch Model
```javascript
{
  name: { type: String, required: true },        // Branch name
  location: { type: String, required: true },     // Branch address
  manager: { type: String, required: true }       // Manager name
}
```

### Staff Model
```javascript
{
  name: { type: String, required: true },         // Staff name
  branchId: { type: ObjectId, ref: 'Branch', required: true }, // Reference to Branch
  role: { type: String, required: true }          // Role (Manager/Chef/Server/etc)
}
```

### Review Model
```javascript
{
  rating: { type: Number, required: true, min: 1, max: 5 },  // 1-5 stars
  comment: { type: String, required: true },                  // Review text
  categories: { type: [String], default: [] },                // Auto-detected
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], required: true },
  branchId: { type: ObjectId, ref: 'Branch', required: true },
  staffId: { type: ObjectId, ref: 'Staff', required: true },
  reply: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}
```

---

## ✨ Features Implemented

### ✅ Core Features
- [x] Express server with MongoDB connection
- [x] Branch, Staff, Review models
- [x] GET /reviews with pagination
- [x] Database seeded with 50+ reviews
>>>>>>> backend
- [x] POST /review endpoint with validation
- [x] PUT /reply/:reviewId endpoint
- [x] GET /analytics with full aggregation
- [x] Input validation with express-validator
- [x] Error handling middleware
- [x] Branch filtering on reviews
<<<<<<< HEAD
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
=======

### 🤖 Auto Features
- [x] Auto sentiment detection (positive/neutral/negative)
- [x] Auto category tagging (Food/Service/Ambience/Cleanliness/Staff/Value/Wait Time)

### 📊 Analytics Calculations
- [x] Average rating across all reviews
- [x] Sentiment breakdown counts
- [x] Branch-wise performance
- [x] Monthly trends (last 6 months)
- [x] Staff performance metrics

### 📦 Sample Data
- [x] 5 Branches seeded
- [x] 19 Staff members seeded
- [x] 50+ Reviews seeded with varied ratings and dates

---

## 🧪 Testing the API

### Using Curl
```bash
# Get all reviews
curl "http://localhost:8000/api/reviews?page=1&limit=5"

# Create a review
curl -X POST http://localhost:8000/api/review \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Great food!","branchId":"ID_HERE","staffId":"ID_HERE"}'

# Update reply
curl -X PUT http://localhost:8000/api/reply/REVIEW_ID \
  -H "Content-Type: application/json" \
  -d '{"reply":"Thank you!"}'

# Get analytics
curl "http://localhost:8000/api/analytics"
```

### Sample IDs (after seeding)
```bash
# Get these from your database or use:
curl "http://localhost:8000/api/reviews?limit=1" | json_pp
>>>>>>> backend
```

---

<<<<<<< HEAD
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
=======
## 🚢 Deployment (Render)
>>>>>>> backend

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

<<<<<<< HEAD
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
=======
**Live URL:** `https://your-backend.onrender.com`

---

## 🤝 Team Integration

### For Person B (Dashboard)
```javascript
// api.service.js
const API_BASE = "http://localhost:8000/api";

export const reviewAPI = {
  // Fetch reviews with pagination and filters
  getReviews: async (page = 1, branchId = null) => {
    let url = `${API_BASE}/reviews?page=${page}&limit=10`;
    if (branchId) url += `&branchId=${branchId}`;
    const res = await fetch(url);
    return res.json();
  },

  // Fetch analytics
  getAnalytics: async (branchId = null) => {
    let url = `${API_BASE}/analytics`;
    if (branchId) url += `?branchId=${branchId}`;
    const res = await fetch(url);
    return res.json();
  },

  // Update reply
  updateReply: async (reviewId, reply) => {
    const res = await fetch(`${API_BASE}/reply/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    });
    return res.json();
  }
};
```

### For Person C (Mobile)
```javascript
// review.service.js
const API_BASE = "http://localhost:8000/api";

export const submitReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_BASE}/review`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit review');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

// Get branches for dropdown
export const getBranches = async () => {
  const res = await fetch(`${API_BASE}/reviews?limit=1`);
  const data = await res.json();
  // Extract unique branches from reviews
  const branches = [...new Set(data.data.map(r => r.branchId))];
  return branches;
};
```

### For Person D (AI)
```javascript
// ai.service.js
const API_BASE = "http://localhost:8000/api";

export const getUnrepliedReviews = async () => {
  const res = await fetch(`${API_BASE}/reviews?limit=50`);
  const data = await res.json();
  return data.data.filter(review => !review.reply);
};

export const getNegativeReviews = async () => {
  const res = await fetch(`${API_BASE}/reviews?limit=50`);
  const data = await res.json();
  return data.data.filter(review => review.rating <= 2);
};
```

---

## 📝 Scripts

```bash
npm run dev     # Start development server with nodemon (auto-restart)
npm start       # Start production server
npm run seed    # Seed database with sample data
```

---

## ⚠️ Error Handling

All errors return consistent format:
```json
{
  "message": "Error description here"
}
```

### Common Status Codes:
| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Server Error |

### Example Error Responses:
```json
// Validation Error (400)
{
  "message": "Rating must be between 1 and 5"
}

// Not Found (404)
{
  "message": "Review not found"
}

// Server Error (500)
{
  "message": "Database connection failed"
}
```

---

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port | No | 8000 |
| MONGO_URI | MongoDB connection string | Yes | - |
| NODE_ENV | Environment (development/production) | No | development |

### .env.example
```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/review-system
NODE_ENV=development
```

---

## 📦 Dependencies

```json
{
  "name": "review-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node seed/seed.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🚀 Quick Start Summary

```bash
# 1. Clone and enter backend
git clone https://github.com/ankitghosh1809/silentslayers-PS-4.git
cd silentslayers-PS-4/backend

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your MongoDB URI

# 4. Seed database
npm run seed

# 5. Start server
npm run dev
```

---

## ✅ Status

| Area | Status |
|------|--------|
| **Branch:** | `backend-dev` |
| **Status:** | 🟢 Complete |
| **Last Updated:** | 2024-02-28 |
| **Author:** | Person A (Backend Lead) |
>>>>>>> backend

---

## 📞 Contact

<<<<<<< HEAD
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
=======
For any issues with the backend API, contact Person A.

**GitHub:** https://github.com/ankitghosh1809/silentslayers-PS-4/tree/backend-dev
>>>>>>> backend

---

## 🙏 Acknowledgments

<<<<<<< HEAD
- Hackathon organizers for the opportunity
- Mentors for guidance
- Open source community for amazing tools
- Team members for hard work and collaboration

---

## 📝 License

This project is created for educational purposes as part of a 24-hour hackathon.

© 2024 Team silentslayers. All rights reserved.
=======
- Team silentslayers for the collaboration
- Hackathon mentors for guidance
- Open source community for amazing tools
>>>>>>> backend

---

<div align="center">
  <p>⚡ Built with speed for 24-Hour Hackathon ⚡</p>
<<<<<<< HEAD
  <p>Problem Statement 4 - Review Management System</p>
=======
  <p>© 2024 Team silentslayers | Problem Statement 4</p>
>>>>>>> backend
  <p>
    <sub>Last updated: February 28, 2024</sub>
  </p>
</div>
```

---

## 📋 HOW TO ADD THIS FILE

```bash
<<<<<<< HEAD
cd ~/Desktop/silentslayers-PS-4
nano README.md
=======
# Navigate to your backend folder
cd ~/Desktop/silentslayers-PS-4/backend

# Create the README file
nano README.md

>>>>>>> backend
# 1. Copy ALL the content above
# 2. Paste in nano (Cmd+V)
# 3. Save: Ctrl+O, then Enter
# 4. Exit: Ctrl+X

# Add to git
git add README.md
<<<<<<< HEAD
git commit -m "Add comprehensive project README with team structure and API docs"
git push origin main
```
=======
git commit -m "Add comprehensive backend README with API documentation"
git push origin backend-dev
```

>>>>>>> backend
