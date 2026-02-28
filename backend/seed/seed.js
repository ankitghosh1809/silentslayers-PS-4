// seed/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models with CORRECT filenames
import Branch from '../models/Branch.js';
import Staff from '../models/Staff.js';
import Review from '../models/Review.js';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await Branch.deleteMany({});
    await Staff.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Cleared existing data');

    // Seed branches
    const branches = await Branch.insertMany([
      {
        name: 'Downtown',
        location: '123 Main Street, Downtown',
        manager: 'John Smith'
      },
      {
        name: 'Uptown',
        location: '456 North Avenue, Uptown',
        manager: 'Sarah Johnson'
      },
      {
        name: 'Suburbs',
        location: '789 South Road, Suburbs',
        manager: 'Michael Brown'
      },
      {
        name: 'Riverside',
        location: '321 East Drive, Riverside',
        manager: 'Emily Davis'
      },
      {
        name: 'Business District',
        location: '654 West Boulevard, Business District',
        manager: 'David Wilson'
      }
    ]);
    console.log(`✅ Seeded ${branches.length} branches`);

    // Staff data for each branch
    const staffMembers = [];
    
    // Staff for Downtown (branch[0])
    staffMembers.push(
      { name: 'Alice Cooper', branchId: branches[0]._id, role: 'Manager' },
      { name: 'Bob Martin', branchId: branches[0]._id, role: 'Chef' },
      { name: 'Carol White', branchId: branches[0]._id, role: 'Server' },
      { name: 'Dave Black', branchId: branches[0]._id, role: 'Server' },
      { name: 'Eve Green', branchId: branches[0]._id, role: 'Host' }
    );

    // Staff for Uptown (branch[1])
    staffMembers.push(
      { name: 'Frank Harris', branchId: branches[1]._id, role: 'Manager' },
      { name: 'Grace Lee', branchId: branches[1]._id, role: 'Chef' },
      { name: 'Henry Clark', branchId: branches[1]._id, role: 'Server' },
      { name: 'Ivy Walker', branchId: branches[1]._id, role: 'Server' }
    );

    // Staff for Suburbs (branch[2])
    staffMembers.push(
      { name: 'Jack Taylor', branchId: branches[2]._id, role: 'Manager' },
      { name: 'Kelly Adams', branchId: branches[2]._id, role: 'Chef' },
      { name: 'Leo Scott', branchId: branches[2]._id, role: 'Server' }
    );

    // Staff for Riverside (branch[3])
    staffMembers.push(
      { name: 'Mia Phillips', branchId: branches[3]._id, role: 'Manager' },
      { name: 'Noah Campbell', branchId: branches[3]._id, role: 'Chef' },
      { name: 'Olivia Parker', branchId: branches[3]._id, role: 'Server' },
      { name: 'Peter Evans', branchId: branches[3]._id, role: 'Server' }
    );

    // Staff for Business District (branch[4])
    staffMembers.push(
      { name: 'Quinn Edwards', branchId: branches[4]._id, role: 'Manager' },
      { name: 'Rachel Collins', branchId: branches[4]._id, role: 'Chef' },
      { name: 'Sam Stewart', branchId: branches[4]._id, role: 'Server' }
    );

    const staff = await Staff.insertMany(staffMembers);
    console.log(`✅ Seeded ${staff.length} staff members`);

    // Sample comments for reviews
    const sampleComments = [
      { rating: 5, text: 'Amazing food and excellent service! The staff was very friendly and the ambiance was perfect.' },
      { rating: 5, text: 'Best restaurant in town! The food is always fresh and delicious.' },
      { rating: 5, text: 'Outstanding experience! Will definitely come back.' },
      { rating: 4, text: 'Great experience overall. Food was tasty and service was good.' },
      { rating: 4, text: 'Nice ambiance and polite staff. Will visit again.' },
      { rating: 4, text: 'Very good food, slightly expensive but worth it.' },
      { rating: 3, text: 'Average food. Service was okay but a bit slow.' },
      { rating: 3, text: 'Nothing special. Just an ordinary experience.' },
      { rating: 3, text: 'Decent place, food could be better.' },
      { rating: 2, text: 'Food was cold and service was slow. Disappointed.' },
      { rating: 2, text: 'Not worth the price. The staff seemed uninterested.' },
      { rating: 2, text: 'Below average experience. Need improvement.' },
      { rating: 1, text: 'Terrible experience! Food was bad and staff was rude.' },
      { rating: 1, text: 'Very dirty tables and long wait time. Never coming back.' },
      { rating: 1, text: 'Worst restaurant ever! Avoid at all costs.' }
    ];

    // Helper function to get sentiment from rating
    const getSentiment = (rating) => {
      if (rating >= 4) return 'positive';
      if (rating === 3) return 'neutral';
      return 'negative';
    };

    // Helper function to detect categories
    const detectCategories = (comment) => {
      const categories = [];
      const lowerComment = comment.toLowerCase();
      
      const keywords = {
        Food: ['food', 'taste', 'delicious', 'meal', 'dish', 'menu', 'appetizer', 'dessert'],
        Service: ['service', 'waiter', 'server', 'attentive', 'slow', 'fast'],
        Ambience: ['ambience', 'atmosphere', 'music', 'lighting', 'decor', 'vibe'],
        Cleanliness: ['clean', 'dirty', 'hygiene', 'table', 'floor'],
        'Staff Behavior': ['rude', 'friendly', 'polite', 'helpful', 'behavior', 'attitude'],
        Value: ['price', 'expensive', 'cheap', 'worth', 'value', 'cost'],
        'Wait Time': ['wait', 'time', 'delay', 'quick', 'slow', 'long']
      };

      Object.entries(keywords).forEach(([category, words]) => {
        if (words.some(word => lowerComment.includes(word))) {
          categories.push(category);
        }
      });

      if (categories.length === 0) categories.push('General');
      return [...new Set(categories)];
    };

    // Generate 50 reviews with random dates
    const reviews = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      const randomBranch = branches[Math.floor(Math.random() * branches.length)];
      const branchStaff = staff.filter(s => s.branchId.toString() === randomBranch._id.toString());
      
      if (branchStaff.length > 0) {
        const randomStaff = branchStaff[Math.floor(Math.random() * branchStaff.length)];
        const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
        
        // Random date within last 90 days
        const randomDays = Math.floor(Math.random() * 90);
        const randomDate = new Date(now);
        randomDate.setDate(randomDate.getDate() - randomDays);

        const categories = detectCategories(randomComment.text);
        const sentiment = getSentiment(randomComment.rating);
        
        // Random replies (50% chance)
        const reply = Math.random() > 0.5 
          ? 'Thank you for your feedback! We appreciate your input and hope to see you again soon.' 
          : '';

        reviews.push({
          rating: randomComment.rating,
          comment: randomComment.text,
          categories,
          sentiment,
          branchId: randomBranch._id,
          staffId: randomStaff._id,
          reply,
          createdAt: randomDate
        });
      }
    }

    const insertedReviews = await Review.insertMany(reviews);
    console.log(`✅ Seeded ${insertedReviews.length} sample reviews`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Branches: ${branches.length}`);
    console.log(`- Staff: ${staff.length}`);
    console.log(`- Reviews: ${insertedReviews.length}`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
