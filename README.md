# 🤖 AI Utilities - Review Management System

<div align="center">
  <h3>Person D | AI Lead</h3>
  <p>Node.js + OpenAI + NLP + Sentiment Analysis</p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-18.x-green" alt="Node.js">
    <img src="https://img.shields.io/badge/OpenAI-API-orange" alt="OpenAI">
    <img src="https://img.shields.io/badge/NLP-Sentiment-blue" alt="NLP">
    <img src="https://img.shields.io/badge/Twilio-SMS-red" alt="Twilio">
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
- [Sentiment Analysis](#-sentiment-analysis)
- [Category Detection](#-category-detection)
- [Reply Generation](#-reply-generation)
- [Alert System](#-alert-system)
- [Testing](#-testing)
- [Integration Guide](#-integration-guide)
- [Dependencies](#-dependencies)

---

## 📌 Overview

AI utilities for the Review Management System that enhance the backend with:
- 🤖 Advanced sentiment analysis (positive/neutral/negative)
- 🏷️ Smart category detection (Food/Service/Staff/Ambience/Cleanliness/Value/Wait Time)
- 💡 AI-powered reply suggestions
- ⚠️ Real-time alerts for negative reviews (SMS/Webhook)
- 📊 Enhanced analytics with AI insights

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| OpenAI GPT-3.5 | AI-powered reply generation |
| Sentiment | Basic sentiment analysis |
| Natural | NLP processing |
| Twilio | SMS Alerts |
| Jest | Testing |

---

## 📂 Folder Structure
ai-utils/
│
├── package.json
├── .env.example
├── README.md
│
├── sentiment.js # Sentiment analysis
├── categories.js # Category detection
├── replyGenerator.js # AI reply suggestions
├── alertSystem.js # Negative review alerts
│
├── utils/
│ ├── keywords.js # Keyword lists
│ └── helpers.js # Helper functions
│
└── tests/
├── sentiment.test.js
├── categories.test.js
└── replyGenerator.test.js

text

---

## 📦 Installation

```bash
# Switch to ai-utils branch
git checkout ai-utils
cd ai-utils

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your API keys
🔧 Environment Setup

Create .env:

env
OPENAI_API_KEY=your_openai_api_key_here
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
ALERT_PHONE_NUMBER=+0987654321
WEBHOOK_URL=https://your-webhook.com/alert
✨ Features

✅ Completed Features

Basic keyword-based sentiment analysis
Advanced OpenAI sentiment analysis (fallback)
Category detection from review text
AI-powered reply suggestions
SMS alerts for negative reviews (rating ≤ 2)
Webhook alerts for integration
Unit tests for all utilities
Confidence scoring
🧠 Sentiment Analysis

sentiment.js

javascript
import natural from 'natural';
import axios from 'axios';

// Keyword-based sentiment (fast, no API cost)
export const analyzeSentiment = (text) => {
  const positiveWords = ['amazing', 'great', 'excellent', 'good', 'love', 'best', 'awesome', 'fantastic', 'perfect', 'wonderful', 'delicious', 'friendly', 'helpful'];
  const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'poor', 'hate', 'disappointing', 'horrible', 'rude', 'slow', 'cold', 'expensive', 'dirty'];
  
  const words = text.toLowerCase().split(/\W+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return { sentiment: 'positive', score: positiveCount - negativeCount, method: 'keyword' };
  if (negativeCount > positiveCount) return { sentiment: 'negative', score: negativeCount - positiveCount, method: 'keyword' };
  return { sentiment: 'neutral', score: 0, method: 'keyword' };
};

// OpenAI sentiment (more accurate)
export const analyzeSentimentAI = async (text) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a sentiment analysis tool. Classify the review as positive, neutral, or negative. Respond with JSON only.' },
        { role: 'user', content: `Classify this review: "${text}"` }
      ],
      temperature: 0
    }, {
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
    });
    
    const result = JSON.parse(response.data.choices[0].message.content);
    return { sentiment: result.sentiment, confidence: result.confidence, method: 'openai' };
  } catch (error) {
    console.error('OpenAI error:', error.message);
    return analyzeSentiment(text); // Fallback to keyword
  }
};

// Combined analysis
export const getSentiment = async (text) => {
  if (process.env.OPENAI_API_KEY) {
    return await analyzeSentimentAI(text);
  }
  return analyzeSentiment(text);
};
🏷️ Category Detection

categories.js

javascript
const categoryKeywords = {
  'Food': ['food', 'dish', 'meal', 'taste', 'flavor', 'delicious', 'yummy', 'spicy', 'sweet', 'sour', 'fresh', 'cold', 'hot', 'portion', 'menu'],
  'Service': ['service', 'server', 'waiter', 'waitress', 'staff', 'attentive', 'prompt', 'fast', 'slow', 'wait', 'time', 'order', 'bring', 'check'],
  'Staff': ['staff', 'server', 'waiter', 'waitress', 'manager', 'chef', 'host', 'friendly', 'rude', 'helpful', 'smile', 'attitude', 'professional'],
  'Ambience': ['ambience', 'atmosphere', 'decor', 'music', 'lighting', 'noise', 'loud', 'quiet', 'cozy', 'romantic', 'vibe', 'mood', 'temperature'],
  'Cleanliness': ['clean', 'dirty', 'bathroom', 'washroom', 'table', 'floor', 'spotless', 'hygiene', 'sanitary', 'tidy', 'messy'],
  'Value': ['price', 'expensive', 'cheap', 'value', 'worth', 'cost', 'bill', 'overpriced', 'reasonable', 'affordable'],
  'Wait Time': ['wait', 'time', 'minute', 'hour', 'long', 'short', 'quick', 'slow', 'delay']
};

export const detectCategories = (text) => {
  const detected = [];
  const textLower = text.toLowerCase();
  
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    for (const keyword of keywords) {
      if (textLower.includes(keyword)) {
        detected.push(category);
        break; // Only add category once
      }
    }
  });
  
  return detected.length > 0 ? detected : ['General'];
};

// AI-powered category detection
export const detectCategoriesAI = async (text) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a category detection tool. Extract categories from the review. Respond with JSON array only.' },
        { role: 'user', content: `Extract categories from: "${text}"` }
      ],
      temperature: 0
    }, {
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
    });
    
    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    return detectCategories(text); // Fallback
  }
};
💡 Reply Generation

replyGenerator.js

javascript
import axios from 'axios';

const templates = {
  positive: [
    "Thank you so much for your kind words! We're thrilled you enjoyed your experience.",
    "We appreciate your positive feedback! Looking forward to serving you again.",
    "So glad to hear you had a great time! Thanks for choosing us."
  ],
  neutral: [
    "Thank you for your feedback. We'll use it to improve our service.",
    "We appreciate you taking the time to share your thoughts.",
    "Thanks for your review. We hope to see you again soon."
  ],
  negative: [
    "We're sorry to hear about your experience. Please contact us so we can make it right.",
    "Thank you for bringing this to our attention. We'll address this immediately.",
    "We apologize for the inconvenience. Our manager will reach out to you shortly."
  ]
};

export const generateReply = (review) => {
  const { sentiment, rating, categories } = review;
  
  if (sentiment === 'positive') {
    return templates.positive[Math.floor(Math.random() * templates.positive.length)];
  } else if (sentiment === 'negative') {
    return templates.negative[Math.floor(Math.random() * templates.negative.length)];
  } else {
    return templates.neutral[Math.floor(Math.random() * templates.neutral.length)];
  }
};

// AI-powered personalized reply
export const generateReplyAI = async (review) => {
  try {
    const prompt = `Generate a professional reply for this review:
Rating: ${review.rating}/5
Comment: "${review.comment}"
Categories: ${review.categories.join(', ')}

The reply should be friendly, professional, and address the specific feedback.`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a customer service representative. Generate professional replies to reviews.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 100
    }, {
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI error:', error.message);
    return generateReply(review); // Fallback to template
  }
};
⚠️ Alert System

alertSystem.js

javascript
import twilio from 'twilio';
import axios from 'axios';

export const sendAlert = async (review) => {
  // Only alert for negative reviews (rating ≤ 2)
  if (review.rating > 2) {
    return { alerted: false, reason: 'Not negative' };
  }
  
  const message = `⚠️ NEGATIVE REVIEW ALERT
Rating: ${review.rating}/5
Branch: ${review.branchId?.name || 'Unknown'}
Comment: ${review.comment.substring(0, 100)}...`;

  const alerts = [];

  // SMS Alert via Twilio
  if (process.env.TWILIO_ACCOUNT_SID && process.env.ALERT_PHONE_NUMBER) {
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      
      await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ALERT_PHONE_NUMBER
      });
      
      alerts.push({ method: 'sms', success: true });
    } catch (error) {
      alerts.push({ method: 'sms', success: false, error: error.message });
    }
  }

  // Webhook Alert
  if (process.env.WEBHOOK_URL) {
    try {
      await axios.post(process.env.WEBHOOK_URL, {
        event: 'negative_review',
        review,
        timestamp: new Date().toISOString()
      });
      
      alerts.push({ method: 'webhook', success: true });
    } catch (error) {
      alerts.push({ method: 'webhook', success: false, error: error.message });
    }
  }

  return { alerted: alerts.length > 0, alerts };
};
🧪 Testing

tests/sentiment.test.js

javascript
import { analyzeSentiment } from '../sentiment.js';

describe('Sentiment Analysis', () => {
  test('detects positive sentiment', () => {
    const result = analyzeSentiment('Amazing food and great service!');
    expect(result.sentiment).toBe('positive');
  });

  test('detects negative sentiment', () => {
    const result = analyzeSentiment('Terrible food and rude staff');
    expect(result.sentiment).toBe('negative');
  });

  test('detects neutral sentiment', () => {
    const result = analyzeSentiment('The food was okay');
    expect(result.sentiment).toBe('neutral');
  });
});
tests/categories.test.js

javascript
import { detectCategories } from '../categories.js';

describe('Category Detection', () => {
  test('detects food category', () => {
    const result = detectCategories('The pizza was delicious');
    expect(result).toContain('Food');
  });

  test('detects service category', () => {
    const result = detectCategories('The waiter was very friendly');
    expect(result).toContain('Service');
  });

  test('detects multiple categories', () => {
    const result = detectCategories('Great food but slow service');
    expect(result).toContain('Food');
    expect(result).toContain('Service');
  });
});
Run tests:

bash
npm test
🔌 Integration Guide

For Backend Integration (Person A)

javascript
// In your reviewController.js
import { getSentiment, detectCategories, generateReplyAI, sendAlert } from 'ai-utils';

export const createReview = async (req, res) => {
  try {
    const reviewData = req.body;
    
    // Enhance with AI
    const sentiment = await getSentiment(reviewData.comment);
    const categories = await detectCategories(reviewData.comment);
    
    const review = new Review({
      ...reviewData,
      sentiment: sentiment.sentiment,
      categories
    });
    
    await review.save();
    
    // Alert if negative
    if (review.rating <= 2) {
      await sendAlert(review);
    }
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
For Dashboard Integration (Person B)

javascript
// Get AI-suggested reply
const getAISuggestion = async (review) => {
  const response = await fetch('/api/ai/suggest-reply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewId: review._id })
  });
  return response.json();
};
📦 Dependencies

json
{
  "name": "ai-utils",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "natural": "^6.0.0",
    "sentiment": "^5.0.2",
    "twilio": "^4.19.0"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
✅ Status

Area	Status
Branch:	ai-utils
Status:	🟢 Complete
Last Updated:	March 2025
Author:	Person D (AI Lead)
📞 Contact

For any issues with AI utilities, contact Person D.

GitHub: https://github.com/ankitghosh1809/silentslayers-PS-4/tree/ai-utils

<div align="center"> <p>⚡ Built for 24-Hour Hackathon ⚡</p> <p>© 2025 Team silentslayers | Problem Statement 4</p> </div> ```
📋 HOW TO ADD THESE README FILES

For each branch:

bash
# Switch to backend branch
git checkout backend
# Create backend README.md (paste the content)
# Then commit
git add README.md
git commit -m "Add backend README"
git push origin backend

# Switch to dashboard branch
git checkout dashboard
# Create dashboard README.md (paste the content)
git add README.md
git commit -m "Add dashboard README"
git push origin dashboard

# Switch to mobile-pwa branch
git checkout mobile-pwa
# Create mobile-pwa README.md (paste the content)
git add README.md
git commit -m "Add mobile-pwa README"
git push origin mobile-pwa

# Switch to ai-utils branch
git checkout ai-utils
# Create ai-utils README.md (paste the content)
git add README.md
git commit -m "Add ai-utils README"
git push origin ai-utils
