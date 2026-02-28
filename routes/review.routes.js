import express from "express";
import {
  createReview,
  getReviews,
  replyToReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/review", createReview);
router.get("/reviews", getReviews);
router.put("/reply/:reviewId", replyToReview);

export default router;