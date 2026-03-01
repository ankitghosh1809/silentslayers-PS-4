# 🚀 Backend API - Review Management System

<div align="center">
  <h3>Person A | Backend Lead</h3>
  <p>Node.js + Express + MongoDB</p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-18.x-green" alt="Node.js">
    <img src="https://img.shields.io/badge/Express-4.18-blue" alt="Express">
    <img src="https://img.shields.io/badge/MongoDB-8.0-brightgreen" alt="MongoDB">
  </p>
</div>

---

## 📋 Table of Contents
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
**Live URL:** `https://review-backend.onrender.com/api`

---

## 🛠️ Tech Stack

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
backend/
│
├── server.js # Entry point
├── package.json
├── .env.example # Environment variables template
│
├── models/
│ ├── Branch.js # Branch schema
│ ├── Staff.js # Staff schema
│ └── Review.js # Review schema
│
├── controllers/
│ ├── reviewController.js # Review CRUD operations
│ └── analyticsController.js # Analytics aggregation
│
├── routes/
│ ├── reviewRoutes.js # Review endpoints
│ └── analyticsRoutes.js # Analytics endpoints
│
├── middleware/
│ ├── errorMiddleware.js # Global error handler
│ └── validationMiddleware.js # Input validation
│
├── utils/
│ ├── sentiment.js # Auto sentiment detection
│ └── categories.js # Auto category tagging
│
├── config/
│ └── db.js # Database connection
│
└── seed/
└── seed.js # Database seeder

text

---

## 🔧 Environment Setup

Create a `.env` file:

```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/review-system
NODE_ENV=development
📦 Installation

bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI

# Seed database with sample data
npm run seed

# Start development server
npm run dev
Server runs at: http://localhost:8000

📡 API Endpoints

1. Create a Review

http
POST /api/review
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing food and excellent service!",
  "branchId": "65f2a1b2c3d4e5f6a7b8c9d0",
  "staffId": "65f2a1b2c3d4e5f6a7b8c9d1"
}
Response:

json
{
  "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
  "rating": 5,
  "comment": "Amazing food and excellent service!",
  "categories": ["Food", "Service"],
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
2. Get All Reviews (Paginated)

http
GET /api/reviews?page=1&limit=10
GET /api/reviews?branchId=65f2a1b2c3d4e5f6a7b8c9d0
Response:

json
{
  "total": 150,
  "page": 1,
  "totalPages": 15,
  "data": [...]
}
3. Update Reply

http
PUT /api/reply/65f2a1b2c3d4e5f6a7b8c9d2
Content-Type: application/json

{
  "reply": "Thank you for your feedback!"
}
4. Get Analytics

http
GET /api/analytics
GET /api/analytics?branchId=65f2a1b2c3d4e5f6a7b8c9d0
Response:

json
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
  "branchWise": [...],
  "monthlyTrend": [...],
  "staffPerformance": [...]
}
📊 Database Models

Branch Model

javascript
{
  name: { type: String, required: true },
  location: { type: String, required: true },
  manager: { type: String, required: true }
}
Staff Model

javascript
{
  name: { type: String, required: true },
  branchId: { type: ObjectId, ref: 'Branch', required: true },
  role: { type: String, required: true }
}
Review Model

javascript
{
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  categories: { type: [String], default: [] },
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], required: true },
  branchId: { type: ObjectId, ref: 'Branch', required: true },
  staffId: { type: ObjectId, ref: 'Staff', required: true },
  reply: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}
✨ Features Implemented

✅ Core Features

Express server with MongoDB connection
Branch, Staff, Review models
GET /reviews with pagination
Database seeded with 50+ reviews (5 branches, 19 staff)
POST /review endpoint with validation
PUT /reply/:reviewId endpoint
GET /analytics with full aggregation
Input validation with express-validator
Error handling middleware
Branch filtering on reviews
🤖 Auto Features

Auto sentiment detection (positive/neutral/negative)
Auto category tagging (Food/Service/Ambience/Cleanliness/Staff/Value/Wait Time)
📊 Analytics Calculations

Average rating across all reviews
Sentiment breakdown counts
Branch-wise performance
Monthly trends (last 6 months)
Staff performance metrics
🧪 Testing the API

bash
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
🚢 Deployment (Render)

bash
# 1. Push to backend branch
git add .
git commit -m "Ready for deployment"
git push origin backend

# 2. Go to render.com
# 3. Click "New +" → "Web Service"
# 4. Connect GitHub repository
# 5. Select branch: backend
# 6. Root Directory: backend
# 7. Build Command: npm install
# 8. Start Command: npm start
# 9. Add Environment Variables:
#    - MONGO_URI = your_mongodb_connection_string
#    - PORT = 8000
#    - NODE_ENV = production
# 10. Click "Create Web Service"
Live URL: https://your-backend.onrender.com

🤝 Team Integration

For Person B (Dashboard)

javascript
const API_BASE = "http://localhost:8000/api";

export const reviewAPI = {
  getReviews: async (page = 1, branchId = null) => {
    let url = `${API_BASE}/reviews?page=${page}&limit=10`;
    if (branchId) url += `&branchId=${branchId}`;
    const res = await fetch(url);
    return res.json();
  },
  getAnalytics: async (branchId = null) => {
    let url = `${API_BASE}/analytics`;
    if (branchId) url += `?branchId=${branchId}`;
    const res = await fetch(url);
    return res.json();
  },
  updateReply: async (reviewId, reply) => {
    const res = await fetch(`${API_BASE}/reply/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    });
    return res.json();
  }
};
For Person C (Mobile)

javascript
const API_BASE = "http://localhost:8000/api";

export const submitReview = async (reviewData) => {
  const response = await fetch(`${API_BASE}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  return await response.json();
};
📝 Scripts

bash
npm run dev     # Start development server with nodemon
npm start       # Start production server
npm run seed    # Seed database with sample data
⚠️ Error Handling

All errors return consistent format:

json
{
  "message": "Error description here"
}
Common Status Codes:

Code	Description
200	Success
201	Created
400	Bad Request (validation error)
404	Not Found
500	Server Error
📦 Dependencies

json
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
🚀 Quick Start Summary

bash
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
✅ Status

Area	Status
Branch:	backend
Status:	🟢 Complete
Last Updated:	March 2025
Author:	Person A (Backend Lead)
📞 Contact

For any issues with the backend API, contact Person A.

GitHub: https://github.com/ankitghosh1809/silentslayers-PS-4/tree/backend

<div align="center"> <p>⚡ Built for 24-Hour Hackathon ⚡</p> <p>© 2025 Team silentslayers | Problem Statement 4</p> </div> ```
