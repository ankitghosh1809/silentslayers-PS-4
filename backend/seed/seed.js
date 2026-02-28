// seed/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the .env file in the parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
import Branch from '../models/branch.model.js';
import Staff from '../models/staff.model.js';
import Review from '../models/review.model.js';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Branch.deleteMany({});
    await Staff.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Cleared existing data');

    // Seed branches
    const branches = await Branch.insertMany([
      {
        name: 'Main Branch - Downtown',
        location: '123 Main Street, Downtown',
        manager: 'John Smith'
      },
      {
        name: 'North Branch - Uptown',
        location: '456 North Avenue, Uptown',
        manager: 'Sarah Johnson'
      },
      {
        name: 'South Branch - Suburbs',
        location: '789 South Road, Suburbs',
        manager: 'Michael Brown'
      },
      {
        name: 'East Branch - Riverside',
        location: '321 East Drive, Riverside',
        manager: 'Emily Davis'
      },
      {
        name: 'West Branch - Business District',
        location: '654 West Boulevard, Business District',
        manager: 'David Wilson'
      }
    ]);
    console.log(`✅ Seeded ${branches.length} branches`);

    // Seed staff members for each branch
    const staffMembers = [];
    
    // Staff for Main Branch (branch[0])
    staffMembers.push(
      {
        name: 'Alice Cooper',
        branchId: branches[0]._id,
        role: 'Manager'
      },
      {
        name: 'Bob Martin',
        branchId: branches[0]._id,
        role: 'Chef'
      },
      {
        name: 'Carol White',
        branchId: branches[0]._id,
        role: 'Server'
      },
      {
        name: 'Dave Black',
        branchId: branches[0]._id,
        role: 'Server'
      },
      {
        name: 'Eve Green',
        branchId: branches[0]._id,
        role: 'Host'
      }
    );

    // Staff for North Branch (branch[1])
    staffMembers.push(
      {
        name: 'Frank Harris',
        branchId: branches[1]._id,
        role: 'Manager'
      },
      {
        name: 'Grace Lee',
        branchId: branches[1]._id,
        role: 'Chef'
      },
      {
        name: 'Henry Clark',
        branchId: branches[1]._id,
        role: 'Server'
      },
      {
        name: 'Ivy Walker',
        branchId: branches[1]._id,
        role: 'Server'
      }
    );

    // Staff for South Branch (branch[2])
    staffMembers.push(
      {
        name: 'Jack Taylor',
        branchId: branches[2]._id,
        role: 'Manager'
      },
      {
        name: 'Kelly Adams',
        branchId: branches[2]._id,
        role: 'Chef'
      },
      {
        name: 'Leo Scott',
        branchId: branches[2]._id,
        role: 'Server'
      }
    );

    // Staff for East Branch (branch[3])
    staffMembers.push(
      {
        name: 'Mia Phillips',
        branchId: branches[3]._id,
        role: 'Manager'
      },
      {
        name: 'Noah Campbell',
        branchId: branches[3]._id,
        role: 'Chef'
      },
      {
        name: 'Olivia Parker',
        branchId: branches[3]._id,
        role: 'Server'
      },
      {
        name: 'Peter Evans',
        branchId: branches[3]._id,
        role: 'Server'
      }
    );

    // Staff for West Branch (branch[4])
    staffMembers.push(
      {
        name: 'Quinn Edwards',
        branchId: branches[4]._id,
        role: 'Manager'
      },
      {
        name: 'Rachel Collins',
        branchId: branches[4]._id,
        role: 'Chef'
      },
      {
        name: 'Sam Stewart',
        branchId: branches[4]._id,
        role: 'Server'
      }
    );

    const staff = await Staff.insertMany(staffMembers);
    console.log(`✅ Seeded ${staff.length} staff members`);

    // Seed sample reviews
    const reviews = [];
    
    // Helper function to get random items
    const getRandomCategories = () => {
      const allCategories = ['Food', 'Service', 'Ambience', 'Staff Behavior', 'Cleanliness', 'Value', 'Wait Time'];
      const numCategories = Math.floor(Math.random() * 3) + 1; // 1 to 3 categories
      const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, numCategories);
    };

    const getSentimentFromRating = (rating) => {
      if (rating >= 4) return 'positive';
      if (rating === 3) return 'neutral';
      return 'negative';
    };

    // Generate 20 sample reviews
    for (let i = 0; i < 20; i++) {
      const randomBranch = branches[Math.floor(Math.random() * branches.length)];
      const branchStaff = staff.filter(s => s.branchId.toString() === randomBranch._id.toString());
      
      if (branchStaff.length > 0) {
        const randomStaff = branchStaff[Math.floor(Math.random() * branchStaff.length)];
        const rating = Math.floor(Math.random() * 5) + 1; // 1-5
        const categories = getRandomCategories();
        const sentiment = getSentimentFromRating(rating);
        
        // Sample comments based on rating
        let comment = '';
        if (rating === 5) comment = 'Excellent experience! The service was outstanding and the food was delicious.';
        else if (rating === 4) comment = 'Very good overall. Great service and nice ambiance.';
        else if (rating === 3) comment = 'Average experience. Some things were good, others need improvement.';
        else if (rating === 2) comment = 'Disappointing. Service was slow and food was below expectations.';
        else comment = 'Very poor experience. Would not recommend.';
        
        // Random replies for some reviews
        let reply = '';
        if (Math.random() > 0.5) {
          reply = 'Thank you for your feedback. We appreciate your input and will work on improving.';
        }

        reviews.push({
          rating,
          comment,
          categories,
          sentiment,
          branchId: randomBranch._id,
          staffId: randomStaff._id,
          reply
        });
      }
    }

    const insertedReviews = await Review.insertMany(reviews);
    console.log(`✅ Seeded ${insertedReviews.length} sample reviews`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\nSummary:');
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


