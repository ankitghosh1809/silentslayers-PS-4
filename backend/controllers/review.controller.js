import Review from "../models/review.model.js";
import Branch from "../models/branch.model.js";
import Staff from "../models/staff.model.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const { rating, comment, categories, sentiment, branchId, staffId } =
      req.body;

    if (!rating || !comment || !sentiment || !branchId || !staffId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const branchExists = await Branch.findById(branchId);
    const staffExists = await Staff.findById(staffId);

    if (!branchExists || !staffExists) {
      return res.status(404).json({ message: "Branch or Staff not found" });
    }

    const review = await Review.create({
      rating,
      comment,
      categories,
      sentiment,
      branchId,
      staffId,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET REVIEWS
export const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, branchId } = req.query;

    const query = branchId ? { branchId } : {};

    const reviews = await Review.find(query)
      .populate("branchId", "name location")
      .populate("staffId", "name role")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REPLY TO REVIEW
export const replyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reply } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { reply },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};