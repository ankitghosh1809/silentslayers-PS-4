// middleware/validationMiddleware.js
import { body, validationResult } from 'express-validator';

/**
 * Validation rules for creating a review
 */
export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  
  body('comment')
    .isString()
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage('Comment must be between 3 and 500 characters'),
  
  body('branchId')
    .isMongoId()
    .withMessage('Invalid branch ID format'),
  
  body('staffId')
    .isMongoId()
    .withMessage('Invalid staff ID format'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }
    next();
  }
];

/**
 * Validation for reply update
 */
export const validateReply = [
  body('reply')
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Reply must be between 1 and 500 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }
    next();
  }
];
