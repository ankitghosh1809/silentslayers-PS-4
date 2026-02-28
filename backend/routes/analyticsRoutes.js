// routes/analyticsRoutes.js
import express from 'express';
import { getAnalytics, getBranchAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

// GET /api/analytics - Main analytics dashboard
router.get('/analytics', getAnalytics);

// GET /api/analytics/branches - Branch performance summary
router.get('/analytics/branches', getBranchAnalytics);

export default router;
