import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import reviewRoutes from './routes/reviewRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// Middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api', reviewRoutes);
app.use('/api', analyticsRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Review Management System API',
    version: '1.0.0',
    endpoints: {
      reviews: '/api/reviews',
      createReview: '/api/review',
      analytics: '/api/analytics'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

// New routes
import issueRoutes from './routes/issueRoutes.js';
import aggregatorRoutes from './routes/aggregatorRoutes.js';

// Add after existing routes
app.use('/api', issueRoutes);
app.use('/api', aggregatorRoutes);
