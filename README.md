# 📱 Mobile PWA - Review Management System

<div align="center">
  <h3>Person C | Mobile PWA Lead</h3>
  <p>React + Vite + PWA + QR Scanner</p>
  <p>
    <img src="https://img.shields.io/badge/React-18.2-blue" alt="React">
    <img src="https://img.shields.io/badge/PWA-Ready-purple" alt="PWA">
    <img src="https://img.shields.io/badge/Vite-4.4-purple" alt="Vite">
    <img src="https://img.shields.io/badge/QR_Scanner-html5qrcode-brightgreen" alt="QR Scanner">
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
- [PWA Setup](#-pwa-setup)
- [QR Code Integration](#-qr-code-integration)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Offline Support](#-offline-support)
- [Scripts](#-scripts)
- [Dependencies](#-dependencies)

---

## 📌 Overview

Mobile Progressive Web App for customers to submit reviews. Features:
- 📷 QR code scanning for branch/staff selection
- ⭐ Star rating component
- 🏷️ Category selection
- 📝 Review submission form
- 📱 Installable on mobile devices
- 🔄 Offline support with service workers

**Live URL:** `https://review-mobile.vercel.app`  
**API Base:** `https://review-backend.onrender.com/api`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| PWA | Progressive Web App |
| html5-qrcode | QR Code Scanner |
| React Router | Navigation |
| Axios | HTTP Client |
| Workbox | Service Workers |

---

## 📂 Folder Structure
mobile-pwa/
│
├── index.html
├── package.json
├── vite.config.js
├── manifest.json # PWA manifest
├── sw.js # Service worker
├── .env.example
│
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ │
│ ├── pages/
│ │ ├── Scan.jsx # QR scanner page
│ │ ├── ReviewForm.jsx # Review submission form
│ │ └── Success.jsx # Success confirmation
│ │
│ ├── components/
│ │ ├── StarRating.jsx # 5-star rating component
│ │ ├── CategorySelector.jsx # Category checkboxes
│ │ ├── CameraPermission.jsx # Camera access request
│ │ └── LoadingSpinner.jsx # Loading state
│ │
│ ├── services/
│ │ └── api.js # API service layer
│ │
│ └── utils/
│ ├── constants.js # App constants
│ └── storage.js # Local storage helpers
│
└── public/
├── icons/
│ ├── icon-72x72.png
│ ├── icon-96x96.png
│ ├── icon-128x128.png
│ ├── icon-144x144.png
│ ├── icon-152x152.png
│ ├── icon-192x192.png
│ ├── icon-384x384.png
│ └── icon-512x512.png
└── splash/
└── splash-512x512.png

text

---

## 📦 Installation

```bash
# Switch to mobile-pwa branch
git checkout mobile-pwa
cd mobile-pwa

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit with your API URL

# Start development server
npm run dev
Mobile app runs at: http://localhost:5174

🔧 Environment Setup

Create .env.local:

env
VITE_API_URL=http://localhost:8000/api
# For production:
# VITE_API_URL=https://your-backend.onrender.com/api
✨ Features

✅ Completed Features

QR code scanner with camera permission
5-star rating component
Category selection (Food/Service/Staff/Ambience/Cleanliness)
Review form with validation
Success page after submission
PWA manifest with icons
Service worker for offline support
Install prompt on mobile devices
Responsive mobile-first design
Loading states and error handling
📱 Pages & Components

Scan Page (/)

text
┌─────────────────────┐
│   Review System     │
├─────────────────────┤
│  ┌───────────────┐  │
│  │               │  │
│  │   QR CODE     │  │
│  │   SCANNER     │  │
│  │               │  │
│  └───────────────┘  │
│                     │
│  Scan QR code at    │
│  your table to      │
│  leave a review     │
│                     │
│  [Request Camera]   │
└─────────────────────┘
Review Form Page (/review)

text
┌─────────────────────┐
│  ← Back            │
├─────────────────────┤
│  Branch: Downtown   │
│  Staff: John (S5)   │
├─────────────────────┤
│  Rating:            │
│  ★ ★ ★ ★ ★          │
├─────────────────────┤
│  Categories:        │
│  ☑ Food  ☑ Service  │
│  ☐ Staff ☐ Ambience │
│  ☐ Cleanliness      │
├─────────────────────┤
│  Comment:           │
│  ┌───────────────┐  │
│  │ Amazing food! │  │
│  └───────────────┘  │
├─────────────────────┤
│  [Submit Review]    │
└─────────────────────┘
Success Page (/success)

text
┌─────────────────────┐
│    ✅              │
├─────────────────────┤
│  Thank You!         │
│                     │
│  Your review has    │
│  been submitted     │
│                     │
│  Rating: ★★★★★      │
│                     │
│  [Submit Another]   │
│  [Close]           │
└─────────────────────┘
⭐ Key Components

StarRating.jsx

jsx
import { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl focus:outline-none"
        >
          <span className={star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default StarRating;
CategorySelector.jsx

jsx
const categories = ['Food', 'Service', 'Staff', 'Ambience', 'Cleanliness'];

const CategorySelector = ({ selected, setSelected }) => {
  const toggle = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter(c => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => toggle(cat)}
          className={`px-3 py-1 rounded-full text-sm ${
            selected.includes(cat)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
QR Scanner (Scan.jsx)

jsx
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Scan = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;

    const scanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render((decodedText) => {
      try {
        // QR format: branchId:staffId
        const [branchId, staffId] = decodedText.split(':');
        scanner.clear();
        navigate(`/review?branch=${branchId}&staff=${staffId}`);
      } catch (error) {
        alert('Invalid QR code');
      }
    });

    return () => scanner.clear();
  }, [scanning, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Scan QR Code</h1>
      {!scanning ? (
        <button
          onClick={() => setScanning(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Camera
        </button>
      ) : (
        <div id="reader" className="w-full"></div>
      )}
    </div>
  );
};
📱 PWA Setup

manifest.json

json
{
  "name": "Review System Mobile",
  "short_name": "Reviews",
  "description": "Leave reviews for your favorite restaurants",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
service-worker.js

javascript
const CACHE_NAME = 'review-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
🔌 API Integration

services/api.js

javascript
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const submitReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE}/review`, reviewData);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Submission failed' 
    };
  }
};

export const getBranchStaff = async (branchId) => {
  try {
    const response = await axios.get(`${API_BASE}/reviews?branchId=${branchId}&limit=1`);
    // Extract staff from reviews
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: 'Failed to load data' };
  }
};
🚢 Deployment (Vercel)

bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Or via Vercel Dashboard:
# 1. Go to vercel.com
# 2. Import GitHub repository
# 3. Select branch: mobile-pwa
# 4. Framework Preset: Vite
# 5. Build Command: npm run build
# 6. Output Directory: dist
# 7. Environment Variables:
#    - VITE_API_URL = https://your-backend.onrender.com/api
# 8. Click Deploy
Live URL: https://review-mobile.vercel.app

🔄 Offline Support

The app works offline after first visit:

✅ App shell cached
✅ Offline fallback page
✅ Form data stored in localStorage
✅ Sync when back online
📝 Scripts

bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
📦 Dependencies

json
{
  "name": "mobile-pwa",
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
    "html5-qrcode": "^2.3.8",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
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
    "vite": "^5.0.0",
    "vite-plugin-pwa": "^0.17.0"
  }
}
✅ Status

Area	Status
Branch:	mobile-pwa
Status:	🟢 Complete
Last Updated:	March 2025
Author:	Person C (Mobile PWA Lead)
📞 Contact

For any issues with the mobile PWA, contact Person C.

GitHub: https://github.com/ankitghosh1809/silentslayers-PS-4/tree/mobile-pwa

<div align="center"> <p>⚡ Built for 24-Hour Hackathon ⚡</p> <p>© 2025 Team silentslayers | Problem Statement 4</p> </div> ```
