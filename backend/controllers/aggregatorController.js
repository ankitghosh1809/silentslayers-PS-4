import SourceReview from '../models/SourceReview.js';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { analyzeSentiment } from '../utils/sentiment.js';
import { detectCategories } from '../utils/categories.js';

// Google Places API integration
export const fetchGoogleReviews = async (req, res) => {
  try {
    const { placeId } = req.query;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          fields: 'name,rating,reviews,formatted_address,formatted_phone_number,website',
          key: apiKey
        }
      }
    );
    
    const place = response.data.result;
    const reviews = place.reviews || [];
    
    const savedReviews = [];
    for (const review of reviews) {
      const existing = await SourceReview.findOne({ sourceId: `google_${review.time}` });
      if (!existing) {
        const sentiment = analyzeSentiment(review.rating, review.text);
        const categories = detectCategories(review.text);
        
        const newReview = await SourceReview.create({
          source: 'google',
          sourceId: `google_${review.time}`,
          businessName: place.name,
          businessAddress: place.formatted_address,
          businessPhone: place.formatted_phone_number,
          businessWebsite: place.website,
          rating: review.rating,
          comment: review.text,
          reviewerName: review.author_name,
          reviewDate: new Date(review.time * 1000),
          categories,
          sentiment
        });
        savedReviews.push(newReview);
      }
    }
    
    res.json({
      success: true,
      count: savedReviews.length,
      data: savedReviews
    });
  } catch (error) {
    console.error('Google fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Zomato API integration
export const fetchZomatoReviews = async (req, res) => {
  try {
    const { restaurantId } = req.query;
    const apiKey = process.env.ZOMATO_API_KEY;
    
    const response = await axios.get(
      `https://developers.zomato.com/api/v2.1/reviews`,
      {
        params: { res_id: restaurantId },
        headers: { 'user-key': apiKey }
      }
    );
    
    const reviews = response.data.user_reviews || [];
    const savedReviews = [];
    
    for (const item of reviews) {
      const review = item.review;
      const existing = await SourceReview.findOne({ sourceId: `zomato_${review.id}` });
      
      if (!existing) {
        const sentiment = analyzeSentiment(review.rating, review.review_text);
        const categories = detectCategories(review.review_text);
        
        const newReview = await SourceReview.create({
          source: 'zomato',
          sourceId: `zomato_${review.id}`,
          businessName: response.data.name,
          rating: review.rating,
          comment: review.review_text,
          reviewerName: review.user.name,
          reviewDate: new Date(review.review_time_friendly),
          categories,
          sentiment
        });
        savedReviews.push(newReview);
      }
    }
    
    res.json({ success: true, count: savedReviews.length });
  } catch (error) {
    console.error('Zomato fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all aggregated reviews
export const getAggregatedReviews = async (req, res) => {
  try {
    const { source, page = 1, limit = 20 } = req.query;
    const query = source ? { source } : {};
    
    const total = await SourceReview.countDocuments(query);
    const reviews = await SourceReview.find(query)
      .sort({ reviewDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Map external review to internal branch/staff
export const mapToInternal = async (req, res) => {
  try {
    const { reviewId, branchId, staffId } = req.body;
    
    const review = await SourceReview.findByIdAndUpdate(
      reviewId,
      { mappedBranchId: branchId, mappedStaffId: staffId },
      { new: true }
    );
    
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
