import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  // Issue details
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['maintenance', 'safety', 'harassment', 'policy', 'equipment', 'other'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  
  // Who raised it
  raisedBy: {
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    staffName: String,
    anonymous: { type: Boolean, default: false }
  },
  
  // Where it happened
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  location: String,
  
  // Evidence
  attachments: [{
    url: String,
    type: String,
    uploadedAt: Date
  }],
  
  // Status tracking
  status: {
    type: String,
    enum: ['reported', 'under_review', 'in_progress', 'resolved', 'closed'],
    default: 'reported'
  },
  
  // Management response
  managementResponse: {
    text: String,
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    respondedAt: Date
  },
  
  // Public visibility
  publicVisible: { type: Boolean, default: true },
  
  // Resolution
  resolvedAt: Date,
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  
  // Comments from public/staff
  comments: [{
    user: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for searching
issueSchema.index({ title: 'text', description: 'text' });
issueSchema.index({ branchId: 1, status: 1 });
issueSchema.index({ severity: 1, createdAt: -1 });

export default mongoose.model('Issue', issueSchema);
