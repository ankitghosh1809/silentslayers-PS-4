// generate-sample-data.js
import fetch from 'node-fetch';

const API_URL = 'https://review-backend-m8d6.onrender.com/api';

// Sample comments for different ratings
const comments = {
  5: [
    "Absolutely amazing! Best dining experience ever!",
    "Outstanding service and delicious food. Will definitely come back!",
    "Perfect evening! The staff went above and beyond.",
    "Exceeded expectations! Great ambiance and wonderful food.",
    "Fantastic! Everything was perfect from start to finish."
  ],
  4: [
    "Very good experience. Food was delicious and service was prompt.",
    "Great place! Nice ambiance and tasty food.",
    "Really enjoyed our meal. Staff was friendly and attentive.",
    "Good value for money. Will recommend to friends.",
    "Pleasant experience. Food was good, service was efficient."
  ],
  3: [
    "Average experience. Food was okay, nothing special.",
    "Decent place. Some dishes were good, others not so much.",
    "It was alright. Service was a bit slow but food was acceptable.",
    "Mixed experience. Good ambiance but food could be better.",
    "Just okay. Expected more based on reviews."
  ],
  2: [
    "Disappointing. Food was cold and service was slow.",
    "Not great. Expected better for the price.",
    "Below average. Staff seemed uninterested.",
    "Wouldn't recommend. Had better experiences elsewhere.",
    "Food was mediocre and service was lacking."
  ],
  1: [
    "Terrible experience! Food was awful and staff was rude.",
    "Worst restaurant ever! Never coming back.",
    "Completely disappointed. Waste of money.",
    "Horrible service and terrible food. Avoid at all costs!",
    "Very poor experience. Management needs to improve."
  ]
};

// Sample staff names by role
const staffByRole = {
  'Manager': ['John Smith', 'Sarah Johnson', 'Mike Brown', 'Emily Davis'],
  'Chef': ['David Wilson', 'Lisa Anderson', 'Tom Harris', 'Anna Lee'],
  'Server': ['James Taylor', 'Maria Garcia', 'Robert Chen', 'Patricia White', 'Kevin Zhang']
};

// Sample branch names
const branches = [
  { name: 'Downtown', location: '123 Main St, City Center' },
  { name: 'Uptown', location: '456 North Ave, Uptown District' },
  { name: 'Suburbs', location: '789 South Rd, Suburban Heights' },
  { name: 'Riverside', location: '321 River Dr, Waterfront' },
  { name: 'Business Park', location: '654 Commerce Blvd, Tech Hub' }
];

// Helper to get random item from array
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper to get random date within last 30 days
const randomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
  return date.toISOString();
};

// First, let's create branches
async function createBranches() {
  console.log('📌 Creating branches...');
  
  // Since we can't directly create branches via API, we'll need branch IDs from seed
  // For now, we'll use the fact that your seed creates 5 branches with predictable IDs
  // In a real scenario, you'd need an API to create branches
  
  // Instead, let's get existing branch IDs from the reviews endpoint
  try {
    const response = await fetch(`${API_URL}/reviews?limit=1`);
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      // Extract unique branch IDs from existing reviews
      const branchIds = [...new Set(data.data.map(r => r.branchId?._id))];
      return branchIds.filter(Boolean);
    }
  } catch (error) {
    console.log('No existing reviews found, will use branch IDs from response after first review');
  }
  
  return [];
}

// Create a single review
async function createReview(branchId, staffId) {
  const rating = Math.floor(Math.random() * 5) + 1;
  const comment = random(comments[rating]);
  
  const reviewData = {
    rating,
    comment,
    branchId,
    staffId
  };

  try {
    const response = await fetch(`${API_URL}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    
    const result = await response.json();
    if (result.success) {
      console.log(`✅ Created ${rating}-star review: "${comment.substring(0, 30)}..."`);
      return result.data;
    } else {
      console.log(`❌ Failed: ${result.message}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return null;
  }
}

// Main function to generate sample data
async function generateSampleData() {
  console.log('🚀 Starting sample data generation...\n');
  
  // First, let's get branch and staff IDs from a test review
  console.log('📊 Creating initial test review to get IDs...\n');
  
  // Create one review to get branch and staff IDs
  const testReview = await fetch(`${API_URL}/reviews?limit=1`).then(r => r.json());
  
  if (testReview.data && testReview.data.length > 0) {
    // Use existing branch and staff IDs
    const branchId = testReview.data[0].branchId._id;
    const staffId = testReview.data[0].staffId._id;
    
    console.log(`✅ Found branch ID: ${branchId}`);
    console.log(`✅ Found staff ID: ${staffId}\n`);
    
    console.log('📝 Creating 20 sample reviews...\n');
    
    for (let i = 0; i < 20; i++) {
      await createReview(branchId, staffId);
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    }
  } else {
    console.log('❌ No existing reviews found. Please run seed first locally and get IDs.');
    console.log('\nRun this locally to seed:');
    console.log('cd ~/Desktop/silentslayers-PS-4/backend && npm run seed');
    console.log('\nThen get IDs from: http://localhost:8001/api/reviews');
  }
  
  console.log('\n✨ Sample data generation complete!');
  console.log('📊 Check your dashboard at: http://localhost:5173');
  console.log('🔍 Verify data at: https://review-backend-m8d6.onrender.com/api/reviews');
}

// Run the generator
generateSampleData().catch(console.error);
