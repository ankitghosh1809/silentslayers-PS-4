// utils/categories.js

/**
 * Detect categories from comment based on keywords
 * @param {string} comment - Review comment
 * @returns {Array} - Array of detected categories
 */
export const detectCategories = (comment) => {
  if (!comment) return ['General'];
  
  const categories = [];
  const lowerComment = comment.toLowerCase();
  
  const keywords = {
    Food: ['food', 'taste', 'delicious', 'soup', 'meal', 'dish', 'menu', 'appetizer', 'dessert', 'flavor', 'spicy', 'sweet'],
    Service: ['service', 'waiter', 'server', 'waitress', 'attentive', 'slow', 'fast', 'prompt', 'helpful'],
    Ambience: ['ambience', 'atmosphere', 'music', 'lighting', 'decor', 'vibe', 'noise', 'quiet', 'loud', 'romantic'],
    Cleanliness: ['clean', 'dirty', 'hygiene', 'bathroom', 'washroom', 'table', 'floor', 'sticky', 'spotless'],
    'Staff Behavior': ['rude', 'friendly', 'polite', 'helpful', 'behavior', 'attitude', 'smile', 'courteous', 'unprofessional'],
    Value: ['price', 'expensive', 'cheap', 'worth', 'value', 'cost', 'bill', 'overpriced', 'reasonable'],
    'Wait Time': ['wait', 'time', 'delay', 'quick', 'slow', 'long', 'minute', 'hour', 'seating', 'reservation']
  };

  Object.entries(keywords).forEach(([category, words]) => {
    if (words.some(word => lowerComment.includes(word))) {
      categories.push(category);
    }
  });

  // If no categories detected, add General
  if (categories.length === 0) {
    categories.push('General');
  }

  // Remove duplicates and return
  return [...new Set(categories)];
};

/**
 * Get all available categories
 * @returns {Array} - List of all categories
 */
export const getAllCategories = () => {
  return [
    'Food',
    'Service',
    'Ambience',
    'Cleanliness',
    'Staff Behavior',
    'Value',
    'Wait Time',
    'General'
  ];
};
