import fetch from 'node-fetch';

const API_URL = 'https://review-backend-m8d6.onrender.com/api';

// PASTE YOUR ACTUAL IDs HERE (from local database)
const BRANCH_ID = '65f2a1b2c3d4e5f6a7b8c9d0';
const STAFF_ID = '65f2a1b2c3d4e5f6a7b8c9dd1';

const comments = [
  // 5-star reviews
  { rating: 5, text: "Absolutely amazing! Best dining experience ever! The food was incredible and service was top-notch." },
  { rating: 5, text: "Outstanding! The staff went above and beyond to make our anniversary special." },
  { rating: 5, text: "Perfect evening! Great ambiance, delicious food, and wonderful service." },
  { rating: 5, text: "Exceeded expectations! Will definitely be coming back with friends." },
  { rating: 5, text: "Fantastic! Everything was perfect from start to finish." },
  
  // 4-star reviews
  { rating: 4, text: "Very good experience. Food was delicious and service was prompt." },
  { rating: 4, text: "Great place! Nice ambiance and tasty food. Would recommend." },
  { rating: 4, text: "Really enjoyed our meal. Staff was friendly and attentive." },
  { rating: 4, text: "Good value for money. The appetizers were particularly good." },
  { rating: 4, text: "Pleasant experience. Food was good, service was efficient." },
  
  // 3-star reviews
  { rating: 3, text: "Average experience. Food was okay, nothing special." },
  { rating: 3, text: "Decent place. Some dishes were good, others not so much." },
  { rating: 3, text: "It was alright. Service was a bit slow but food was acceptable." },
  { rating: 3, text: "Mixed experience. Good ambiance but food could be better." },
  { rating: 3, text: "Just okay. Expected more based on the reviews." },
  
  // 2-star reviews
  { rating: 2, text: "Disappointing. Food was cold and service was slow." },
  { rating: 2, text: "Not great. Expected better for the price we paid." },
  { rating: 2, text: "Below average. Staff seemed uninterested in helping." },
  { rating: 2, text: "Wouldn't recommend. Had better experiences elsewhere." },
  { rating: 2, text: "Food was mediocre and service was lacking." },
  
  // 1-star reviews
  { rating: 1, text: "Terrible experience! Food was awful and staff was rude." },
  { rating: 1, text: "Worst restaurant ever! Never coming back again." },
  { rating: 1, text: "Completely disappointed. Waste of money and time." },
  { rating: 1, text: "Horrible service and terrible food. Avoid at all costs!" },
  { rating: 1, text: "Very poor experience. Management needs to improve urgently." }
];

async function createReviews() {
  console.log('🚀 Creating sample reviews...\n');
  
  if (BRANCH_ID.includes('PASTE') || STAFF_ID.includes('PASTE')) {
    console.log('❌ Please edit create-reviews.js and add your actual branchId and staffId');
    console.log('\nGet IDs from: http://localhost:8001/api/reviews');
    return;
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < comments.length; i++) {
    const review = comments[i];
    
    try {
      const response = await fetch(`${API_URL}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: review.rating,
          comment: review.text,
          branchId: BRANCH_ID,
          staffId: STAFF_ID
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ [${i+1}/${comments.length}] Created ${review.rating}-star review`);
        success++;
      } else {
        console.log(`❌ [${i+1}/${comments.length}] Failed: ${result.message}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ [${i+1}/${comments.length}] Error: ${error.message}`);
      failed++;
    }
    
    // Small delay to avoid overwhelming the API
    await new Promise(r => setTimeout(r, 300));
  }
  
  console.log('\n✨ Done!');
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('\n📊 Check your dashboard: http://localhost:5173');
}

createReviews();
