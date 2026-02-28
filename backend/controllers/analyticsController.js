// controllers/analyticsController.js
import Review from '../models/Review.js';
import Branch from '../models/Branch.js';

// @desc    Get analytics dashboard data
// @route   GET /api/analytics
export const getAnalytics = async (req, res) => {
  try {
    const { branchId } = req.query;
    
    // Build filter
    const filter = {};
    if (branchId) filter.branchId = branchId;

    // 1. Overall stats
    const totalReviews = await Review.countDocuments(filter);
    
    // 2. Average rating
    const avgRatingResult = await Review.aggregate([
      { $match: filter },
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);
    const averageRating = avgRatingResult[0]?.average.toFixed(1) || 0;

    // 3. Sentiment counts
    const sentimentCounts = await Review.aggregate([
      { $match: filter },
      { $group: { _id: '$sentiment', count: { $sum: 1 } } }
    ]);

    // Format sentiment counts
    const sentimentMap = {
      positive: 0,
      neutral: 0,
      negative: 0
    };
    
    sentimentCounts.forEach(item => {
      if (item._id) sentimentMap[item._id] = item.count;
    });

    // 4. Rating distribution
    const ratingDistribution = await Review.aggregate([
      { $match: filter },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Format rating distribution
    const ratings = {};
    for (let i = 1; i <= 5; i++) {
      ratings[i] = 0;
    }
    ratingDistribution.forEach(item => {
      ratings[item._id] = item.count;
    });

    // 5. Branch-wise ratings
    const branchWiseRatings = await Review.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$branchId',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          positiveCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'positive'] }, 1, 0] }
          },
          negativeCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'negative'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'branches',
          localField: '_id',
          foreignField: '_id',
          as: 'branch'
        }
      },
      { $unwind: '$branch' },
      {
        $project: {
          branchId: '$_id',
          branchName: '$branch.name',
          location: '$branch.location',
          averageRating: { $round: ['$averageRating', 1] },
          totalReviews: 1,
          positiveCount: 1,
          negativeCount: 1
        }
      },
      { $sort: { averageRating: -1 } }
    ]);

    // 6. Monthly trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrend = await Review.aggregate([
      {
        $match: {
          ...filter,
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              { $toString: '$_id.month' }
            ]
          },
          averageRating: { $round: ['$averageRating', 1] },
          totalReviews: 1
        }
      }
    ]);

    // 7. Staff performance
    const staffPerformance = await Review.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$staffId',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          responseRate: {
            $avg: { $cond: [{ $ne: ['$reply', ''] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'staff',
          localField: '_id',
          foreignField: '_id',
          as: 'staff'
        }
      },
      { $unwind: '$staff' },
      {
        $lookup: {
          from: 'branches',
          localField: 'staff.branchId',
          foreignField: '_id',
          as: 'branch'
        }
      },
      { $unwind: '$branch' },
      {
        $project: {
          staffId: '$_id',
          staffName: '$staff.name',
          role: '$staff.role',
          branchName: '$branch.name',
          averageRating: { $round: ['$averageRating', 1] },
          totalReviews: 1,
          responseRate: { $round: [{ $multiply: ['$responseRate', 100] }, 0] }
        }
      },
      { $sort: { averageRating: -1 } },
      { $limit: 10 }
    ]);

    // 8. Recent reviews (last 5)
    const recentReviews = await Review.find(filter)
      .populate('branchId', 'name')
      .populate('staffId', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        overview: {
          totalReviews,
          averageRating: parseFloat(averageRating),
          sentimentBreakdown: sentimentMap,
          ratingDistribution: ratings
        },
        branchWise: branchWiseRatings,
        monthlyTrend,
        staffPerformance,
        recentReviews: recentReviews.map(r => ({
          id: r._id,
          rating: r.rating,
          comment: r.comment.substring(0, 50) + '...',
          sentiment: r.sentiment,
          branchName: r.branchId?.name,
          staffName: r.staffId?.name,
          createdAt: r.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get branch performance summary
// @route   GET /api/analytics/branches
export const getBranchAnalytics = async (req, res) => {
  try {
    const branchAnalytics = await Review.aggregate([
      {
        $group: {
          _id: '$branchId',
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          positiveCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'positive'] }, 1, 0] }
          },
          negativeCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'negative'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'branches',
          localField: '_id',
          foreignField: '_id',
          as: 'branch'
        }
      },
      { $unwind: '$branch' },
      {
        $project: {
          branchId: '$_id',
          branchName: '$branch.name',
          location: '$branch.location',
          manager: '$branch.manager',
          totalReviews: 1,
          averageRating: { $round: ['$averageRating', 1] },
          positiveCount: 1,
          negativeCount: 1
        }
      },
      { $sort: { averageRating: -1 } }
    ]);

    res.json({
      success: true,
      data: branchAnalytics
    });
  } catch (error) {
    console.error('Branch analytics error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};
