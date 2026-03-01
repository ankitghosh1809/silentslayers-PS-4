import Issue from '../models/Issue.js';
import Staff from '../models/Staff.js';
import Branch from '../models/Branch.js';

// Create new issue (by staff)
export const createIssue = async (req, res) => {
  try {
    const { title, description, category, severity, branchId, staffId, anonymous, location } = req.body;
    
    // Verify staff exists
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(400).json({ success: false, message: 'Staff not found' });
    }
    
    const issue = await Issue.create({
      title,
      description,
      category,
      severity,
      branchId,
      raisedBy: {
        staffId,
        staffName: anonymous ? 'Anonymous' : staff.name,
        anonymous
      },
      location,
      status: 'reported'
    });
    
    // Populate for response
    const populatedIssue = await Issue.findById(issue._id)
      .populate('branchId', 'name location')
      .populate('raisedBy.staffId', 'name role');
    
    res.status(201).json({ success: true, data: populatedIssue });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all issues (public view)
export const getPublicIssues = async (req, res) => {
  try {
    const { branchId, status, severity, page = 1, limit = 20 } = req.query;
    
    const query = { publicVisible: true };
    if (branchId) query.branchId = branchId;
    if (status) query.status = status;
    if (severity) query.severity = severity;
    
    const total = await Issue.countDocuments(query);
    const issues = await Issue.find(query)
      .populate('branchId', 'name location')
      .populate('raisedBy.staffId', 'name role')
      .sort({ severity: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: issues
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all issues (admin view)
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({})
      .populate('branchId', 'name location')
      .populate('raisedBy.staffId', 'name role')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: issues });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update issue status
export const updateIssueStatus = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { status, response, respondedBy } = req.body;
    
    const updateData = { status };
    if (response) {
      updateData.managementResponse = {
        text: response,
        respondedBy,
        respondedAt: new Date()
      };
    }
    if (status === 'resolved') {
      updateData.resolvedAt = new Date();
      updateData.resolvedBy = respondedBy;
    }
    
    const issue = await Issue.findByIdAndUpdate(
      issueId,
      updateData,
      { new: true }
    ).populate('branchId', 'name location');
    
    res.json({ success: true, data: issue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add comment to issue
export const addComment = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { user, text } = req.body;
    
    const issue = await Issue.findByIdAndUpdate(
      issueId,
      { $push: { comments: { user, text, createdAt: new Date() } } },
      { new: true }
    );
    
    res.json({ success: true, data: issue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get issue statistics
export const getIssueStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const severityStats = await Issue.aggregate([
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        byStatus: stats,
        bySeverity: severityStats,
        total: await Issue.countDocuments()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
