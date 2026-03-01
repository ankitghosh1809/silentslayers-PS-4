import mongoose from 'mongoose';

const sourceReviewSchema = new mongoose.Schema({
  // Original source information
  source: {
    type: String,
    required: true,
    enum: ['google', 'zomato', 'yelp', 'tripadvisor', 'facebook', 'internal']
  },
  sourceId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Business information
  businessName: { type: String, required: true },
  businessAddress: String,
  businessPhone: String,
  businessWebsite: String,
  
  // Review content
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  reviewerName: String,
  reviewerAvatar: String,
  reviewDate: { type: Date, required: true },
  
  // Categories and sentiment (AI-enhanced)
  categories: [{ type: String }],
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    required: true
  },
  
  // Mapping to your system
  mappedBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  },
  mappedStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  
  // Metadata
  importedAt: { type: Date, default: Date.now },
  lastUpdated: Date,
  isActive: { type: Boolean, default: true }
});

// Index for searching
sourceReviewSchema.index({ businessName: 'text', comment: 'text' });
sourceReviewSchema.index({ source: 1, reviewDate: -1 });

export default mongoose.model('SourceReview', sourceReviewSchema);
