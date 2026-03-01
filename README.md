# 📊 Admin Dashboard - Review Management System

<div align="center">
  <h3>Person B | Dashboard Lead</h3>
  <p>React + Vite + TailwindCSS + Recharts</p>
  <p>
    <img src="https://img.shields.io/badge/React-18.2-blue" alt="React">
    <img src="https://img.shields.io/badge/Vite-4.4-purple" alt="Vite">
    <img src="https://img.shields.io/badge/TailwindCSS-3.3-06B6D4" alt="TailwindCSS">
    <img src="https://img.shields.io/badge/Recharts-2.8-orange" alt="Recharts">
  </p>
</div>

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Features](#-features)
- [Pages & Components](#-pages--components)
- [API Integration](#-api-integration)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Scripts](#-scripts)
- [Dependencies](#-dependencies)

---

## 📌 Overview

Admin dashboard for the Review Management System. Provides:
- 📊 Real-time analytics and insights
- 📝 Review management with reply functionality
- 🏢 Branch-wise filtering
- 👥 Staff performance tracking
- 📈 Interactive charts and visualizations

**Live URL:** `https://review-dashboard.vercel.app`  
**API Base:** `https://review-backend.onrender.com/api`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| TailwindCSS | Styling |
| Recharts | Data Visualization |
| React Router | Navigation |
| Axios | HTTP Client |
| React Hot Toast | Notifications |

---

## 📂 Folder Structure
dashboard/
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
│
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx # Analytics dashboard
│ │ └── Reviews.jsx # Reviews management
│ │
│ ├── components/
│ │ ├── Sidebar.jsx # Navigation sidebar
│ │ ├── Navbar.jsx # Top navbar
│ │ ├── StatsCards.jsx # KPI cards
│ │ ├── SentimentChart.jsx # Sentiment pie chart
│ │ ├── TrendsChart.jsx # Monthly trends line chart
│ │ ├── BranchChart.jsx # Branch performance bar chart
│ │ ├── StaffTable.jsx # Staff performance table
│ │ ├── ReviewsTable.jsx # Reviews list table
│ │ ├── ReplyDrawer.jsx # Reply modal/drawer
│ │ ├── BranchFilter.jsx # Branch selector
│ │ └── LoadingSpinner.jsx # Loading state
│ │
│ ├── services/
│ │ └── api.js # API service layer
│ │
│ └── utils/
│ ├── formatters.js # Data formatters
│ └── constants.js # App constants
│
└── public/
└── favicon.ico

text

---

## 📦 Installation

```bash
# Switch to dashboard branch
git checkout dashboard
cd dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit with your API URL

# Start development server
npm run dev
Dashboard runs at: http://localhost:5173

🔧 Environment Setup

Create .env.local:

env
VITE_API_URL=http://localhost:8000/api
# For production:
# VITE_API_URL=https://your-backend.onrender.com/api
✨ Features

✅ Completed Features

Responsive sidebar layout
Dark/light mode toggle
Stats cards (Total Reviews, Avg Rating, Sentiment Counts)
Sentiment breakdown pie chart
Monthly trends line chart
Branch performance bar chart
Staff performance table with ratings
Reviews table with pagination
Branch filter for all views
Reply drawer for each review
Real-time API integration
Loading states and error handling
Toast notifications for actions
📊 Pages & Components

Dashboard Page (/dashboard)

text
┌─────────────────────────────────────┐
│  Stats Cards (4)                    │
├─────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐           │
│ │ Sentiment│ │ Monthly  │           │
│ │ Pie Chart│ │Trend Chart│          │
│ └──────────┘ └──────────┘           │
├─────────────────────────────────────┤
│ Branch Performance Chart             │
├─────────────────────────────────────┤
│ Staff Performance Table              │
└─────────────────────────────────────┘
Reviews Page (/reviews)

text
┌─────────────────────────────────────┐
│ Branch Filter    [Downtown ▼]       │
├─────────────────────────────────────┤
│ Reviews Table                        │
│ ┌─────────────────────────────────┐ │
│ │ Rating │ Comment │ Branch │ Actions│
│ ├─────────────────────────────────┤ │
│ │ ★★★★★  │ Great...│ Downtown│ Reply │
│ │ ★★★★☆  │ Good... │ Uptown  │ Reply │
│ └─────────────────────────────────┘ │
│ Pagination: ◀ 1 2 3 4 5 ▶           │
└─────────────────────────────────────┘
🔌 API Integration

services/api.js

javascript
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export const reviewAPI = {
  // Get paginated reviews
  getReviews: async (page = 1, branchId = null) => {
    const params = { page, limit: 10 };
    if (branchId) params.branchId = branchId;
    const { data } = await api.get('/reviews', { params });
    return data;
  },

  // Get analytics
  getAnalytics: async (branchId = null) => {
    const params = branchId ? { branchId } : {};
    const { data } = await api.get('/analytics', { params });
    return data;
  },

  // Update reply
  updateReply: async (reviewId, reply) => {
    const { data } = await api.put(`/reply/${reviewId}`, { reply });
    return data;
  }
};
🧩 Key Components

StatsCards.jsx

jsx
const StatsCards = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500">Total Reviews</h3>
      <p className="text-2xl font-bold">{data.totalReviews}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500">Average Rating</h3>
      <p className="text-2xl font-bold">{data.avgRating.toFixed(1)} ★</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500">Positive</h3>
      <p className="text-2xl font-bold text-green-600">{data.positive}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500">Negative</h3>
      <p className="text-2xl font-bold text-red-600">{data.negative}</p>
    </div>
  </div>
);
SentimentChart.jsx

jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const SentimentChart = ({ data }) => (
  <PieChart width={400} height={300}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);
🚢 Deployment (Vercel)

bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Or via Vercel Dashboard:
# 1. Go to vercel.com
# 2. Import GitHub repository
# 3. Select branch: dashboard
# 4. Framework Preset: Vite
# 5. Build Command: npm run build
# 6. Output Directory: dist
# 7. Environment Variables:
#    - VITE_API_URL = https://your-backend.onrender.com/api
# 8. Click Deploy
Live URL: https://review-dashboard.vercel.app

📝 Scripts

bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
📦 Dependencies

json
{
  "name": "dashboard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.0",
    "react-router-dom": "^6.20.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.0"
  }
}
🎨 Tailwind Configuration

javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
✅ Status

Area	Status
Branch:	dashboard
Status:	🟢 Complete
Last Updated:	March 2025
Author:	Person B (Dashboard Lead)
📞 Contact

For any issues with the dashboard, contact Person B.

GitHub: https://github.com/ankitghosh1809/silentslayers-PS-4/tree/dashboard

<div align="center"> <p>⚡ Built for 24-Hour Hackathon ⚡</p> <p>© 2025 Team silentslayers | Problem Statement 4</p> </div> ```
