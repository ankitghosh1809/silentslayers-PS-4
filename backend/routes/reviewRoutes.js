// routes/reviewRoutes.js
import express from 'express';
import { 
  createReview, 
  getReviews, 
  updateReply,
  getReviewById 
} from '../controllers/reviewController.js';
import { validateReview, validateReply } from '../middleware/validationMiddleware.js';

const router = express.Router();

// POST /api/review - Create new review
router.post('/review', validateReview, createReview);

// GET /api/reviews - Get all reviews (paginated)
router.get('/reviews', getReviews);

// GET /api/review/:id - Get single review
router.get('/review/:id', getReviewById);

// PUT /api/reply/:reviewId - Update reply
router.put('/reply/:reviewId', validateReply, updateReply);

export default router;
