import express from 'express';
import {
  fetchGoogleReviews,
  fetchZomatoReviews,
  getAggregatedReviews,
  mapToInternal
} from '../controllers/aggregatorController.js';

const router = express.Router();

router.get('/aggregator/google', fetchGoogleReviews);
router.get('/aggregator/zomato', fetchZomatoReviews);
router.get('/aggregator/reviews', getAggregatedReviews);
router.post('/aggregator/map', mapToInternal);

export default router;
