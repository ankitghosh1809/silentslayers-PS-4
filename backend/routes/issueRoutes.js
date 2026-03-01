import express from 'express';
import {
  createIssue,
  getPublicIssues,
  getAllIssues,
  updateIssueStatus,
  addComment,
  getIssueStats
} from '../controllers/issueController.js';

const router = express.Router();

// Public endpoints
router.post('/issues', createIssue);
router.get('/issues/public', getPublicIssues);
router.post('/issues/:issueId/comments', addComment);

// Admin endpoints
router.get('/issues/all', getAllIssues);
router.put('/issues/:issueId/status', updateIssueStatus);
router.get('/issues/stats', getIssueStats);

export default router;
