# 🚀 Backend API - Review Management System

<div align="center">
  <h3>Person A | Backend Lead</h3>
  <p>Node.js + Express + MongoDB</p>
  <p>
    <a href="#-api-endpoints">API Docs</a> •
    <a href="#-installation">Setup</a> •
    <a href="#-database-models">Models</a> •
    <a href="#-deployment">Deploy</a>
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
**Live URL:** `https://your-backend.onrender.com/api`

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
```

---

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
```

**Server will run at:** `http://localhost:8000`

---

## 📡 API Endpoints

### 1. Create a Review
```http
POST /api/review
Content-Type: application/json

{
  "rating": 5,
  "comment": "Amazing food and excellent service!",
  "branchId": "65f2a1b2c3d4e5f6a7b8c9d0",
  "staffId": "65f2a1b2c3d4e5f6a7b8c9d1"
}
```

**Response:**
```json
{
  "_id": "65f2a1b2c3d4e5f6a7b8c9d2",
  "rating": 5,
  "comment": "Amazing food and excellent service!",
  "categories": ["Food", "Service"],
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
GET /api/reviews?page=1&limit=10
GET /api/reviews?branchId=65f2a1b2c3d4e5f6a7b8c9d0
GET /api/reviews?page=2&limit=10&branchId=65f2a1b2c3d4e5f6a7b8c9d0
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
PUT /api/reply/65f2a1b2c3d4e5f6a7b8c9d2
Content-Type: application/json

{
  "reply": "Thank you for your feedback! We appreciate your input."
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
  "reply": "Thank you for your feedback! We appreciate your input.",
  "createdAt": "2024-03-14T10:30:00.000Z"
}
```

---

### 4. Get Analytics
```http
GET /api/analytics
GET /api/analytics?branchId=65f2a1b2c3d4e5f6a7b8c9d0
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
    }
  ],
  "staffPerformance": [
    {
      "name": "John Doe",
      "role": "Server",
      "avgRating": 4.8,
      "totalReviews": 25,
      "responseRate": 85
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
    }
  ]
}
```

---

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
- [x] POST /review endpoint with validation
- [x] PUT /reply/:reviewId endpoint
- [x] GET /analytics with full aggregation
- [x] Input validation with express-validator
- [x] Error handling middleware
- [x] Branch filtering on reviews

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
```

---

## 🚢 Deployment (Render)

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

---

## 📞 Contact

For any issues with the backend API, contact Person A.

**GitHub:** https://github.com/ankitghosh1809/silentslayers-PS-4/tree/backend-dev

---

## 🙏 Acknowledgments

- Team silentslayers for the collaboration
- Hackathon mentors for guidance
- Open source community for amazing tools

---

<div align="center">
  <p>⚡ Built with speed for 24-Hour Hackathon ⚡</p>
  <p>© 2024 Team silentslayers | Problem Statement 4</p>
  <p>
    <sub>Last updated: February 28, 2024</sub>
  </p>
</div>
```

---

## 📋 HOW TO ADD THIS FILE

```bash
# Navigate to your backend folder
cd ~/Desktop/silentslayers-PS-4/backend

# Create the README file
nano README.md

# 1. Copy ALL the content above
# 2. Paste in nano (Cmd+V)
# 3. Save: Ctrl+O, then Enter
# 4. Exit: Ctrl+X

# Add to git
git add README.md
git commit -m "Add comprehensive backend README with API documentation"
git push origin backend-dev
```

