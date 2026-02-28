// controllers/reviewController.js
import Review from '../models/Review.js';
import Branch from '../models/Branch.js';
import Staff from '../models/Staff.js';
import { analyzeSentiment } from '../utils/sentiment.js';
import { detectCategories } from '../utils/categories.js';

// @desc    Create new review
// @route   POST /api/review
export const createReview = async (req, res) => {
  try {
    const { rating, comment, branchId, staffId } = req.body;

    // Validate branch exists
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(400).json({ 
        success: false,
        message: 'Branch not found' 
      });
    }

    // Validate staff exists and belongs to branch
    const staff = await Staff.findOne({ _id: staffId, branchId });
    if (!staff) {
      return res.status(400).json({ 
        success: false,
        message: 'Staff not found or does not belong to this branch' 
      });
    }

    // Auto-detect sentiment and categories
    const sentiment = analyzeSentiment(rating, comment);
    const categories = detectCategories(comment);

    // Create review
    const review = await Review.create({
      rating,
      comment,
      categories,
      sentiment,
      branchId,
      staffId,
      reply: ''
    });

    // Populate branch and staff details
    const populatedReview = await Review.findById(review._id)
      .populate('branchId', 'name location')
      .populate('staffId', 'name role');

    res.status(201).json({
      success: true,
      data: populatedReview
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get all reviews with pagination and filtering
// @route   GET /api/reviews
export const getReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const branchId = req.query.branchId;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (branchId) filter.branchId = branchId;

    // Get total count for pagination
    const total = await Review.countDocuments(filter);

    // Get reviews with population
    const reviews = await Review.find(filter)
      .populate('branchId', 'name location')
      .populate('staffId', 'name role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Update review reply
// @route   PUT /api/reply/:reviewId
export const updateReply = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === '') {
      return res.status(400).json({ 
        success: false,
        message: 'Reply cannot be empty' 
      });
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { reply: reply.trim() },
      { new: true, runValidators: true }
    ).populate('branchId', 'name location')
     .populate('staffId', 'name role');

    if (!review) {
      return res.status(404).json({ 
        success: false,
        message: 'Review not found' 
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Update reply error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get single review by ID
// @route   GET /api/review/:id
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('branchId', 'name location')
      .populate('staffId', 'name role');

    if (!review) {
      return res.status(404).json({ 
        success: false,
        message: 'Review not found' 
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};
