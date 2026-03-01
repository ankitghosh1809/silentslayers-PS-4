export const detectCategories = (comment) => {
  if (!comment) return ['General'];
  const categories = [];
  const lowerComment = comment.toLowerCase();
  const keywords = {
    Food: ['food', 'taste', 'delicious', 'meal'],
    Service: ['service', 'staff', 'waiter'],
    Ambience: ['ambience', 'atmosphere', 'music'],
    Cleanliness: ['clean', 'dirty'],
    'Staff Behavior': ['rude', 'friendly', 'polite'],
    Value: ['price', 'expensive', 'worth'],
    'Wait Time': ['wait', 'time', 'slow']
  };
  Object.entries(keywords).forEach(([category, words]) => {
    if (words.some(word => lowerComment.includes(word))) categories.push(category);
  });
  if (categories.length === 0) categories.push('General');
  return [...new Set(categories)];
};
