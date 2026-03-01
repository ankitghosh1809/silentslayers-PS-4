// utils/sentiment.js

/**
 * Analyze sentiment based on rating and comment
 * @param {number} rating - 1-5 star rating
 * @param {string} comment - Review comment
 * @returns {string} - 'positive', 'neutral', or 'negative'
 */
export const analyzeSentiment = (rating, comment = '') => {
  // Primary based on rating
  if (rating >= 4) return 'positive';
  if (rating === 3) return 'neutral';
  if (rating <= 2) return 'negative';
  
  // Fallback to default
  return 'neutral';
};

/**
 * Advanced sentiment analysis using keywords
 * @param {string} comment - Review comment
 * @returns {string} - Enhanced sentiment
 */
export const advancedSentiment = (comment) => {
  if (!comment) return 'neutral';
  
  const lowerComment = comment.toLowerCase();
  
  const positiveWords = ['amazing', 'excellent', 'great', 'good', 'love', 'best', 'awesome', 'fantastic', 'wonderful', 'perfect'];
  const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'poor', 'disappointing', 'rude', 'slow', 'dirty'];
  
  let score = 0;
  
  positiveWords.forEach(word => {
    if (lowerComment.includes(word)) score += 1;
  });
  
  negativeWords.forEach(word => {
    if (lowerComment.includes(word)) score -= 1;
  });
  
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
};
