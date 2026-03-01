import { analyzeSentiment } from './sentiment.js';
import { detectCategories } from './categories.js';

console.log('🤖 Testing AI Utilities...\n');

const test1 = analyzeSentiment(5, 'Amazing food!');
console.log('Sentiment test (5 stars):', test1);

const test2 = analyzeSentiment(1, 'Terrible service');
console.log('Sentiment test (1 star):', test2);

const cats = detectCategories('The pizza was delicious with great service');
console.log('Categories detected:', cats);

console.log('\n✅ AI Utilities are ready!');
