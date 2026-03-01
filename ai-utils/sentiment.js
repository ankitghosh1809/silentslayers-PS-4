export const analyzeSentiment = (rating, comment = '') => {
  if (rating >= 4) return 'positive';
  if (rating === 3) return 'neutral';
  return 'negative';
};

export const advancedSentiment = (comment) => {
  if (!comment) return 'neutral';
  const lowerComment = comment.toLowerCase();
  const positiveWords = ['amazing', 'excellent', 'great', 'good', 'love', 'best'];
  const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'poor'];
  let score = 0;
  positiveWords.forEach(word => { if (lowerComment.includes(word)) score++; });
  negativeWords.forEach(word => { if (lowerComment.includes(word)) score--; });
  return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
};
