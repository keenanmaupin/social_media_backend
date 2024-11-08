import User from '../models/User.js';
import Thought from '../models/Thought.js';
import clean_db from './clean_db.js';
import db from '../config/connection.js';

async function seedDatabase() {
  try {
    // Connect to the database
    const connection = await db(); // Wait for the database connection
    if (!connection.readyState) {
      throw new Error("Database connection is not established. Seeding aborted.");
    }

    // Clean the database before seeding
    await clean_db(); // Assuming this clears the DB
    console.log('Database cleaned.');

    // Seed users
    const seedUsers = [
      { username: 'starski', email: 'starski@example.com' },
      { username: 'hutch', email: 'hutch@example.com' },
    ];

    const createdUsers = await User.insertMany(seedUsers);
    console.log(`Inserted ${createdUsers.length} users.`);

    // Seed thoughts
    const seedThoughts = [
      {
        username: 'starski',
        thoughtText: 'This is a thought from Starski.',
        reactions: [{ reactionBody: 'Interesting thought!', username: 'hutch' }],
      },
      {
        username: 'hutch',
        thoughtText: 'This is a thought from Hutch.',
        reactions: [{ reactionBody: 'Thanks, Starski!', username: 'starski' }],
      },
    ];

    const createdThoughts = await Thought.insertMany(seedThoughts);
    console.log(`Inserted ${createdThoughts.length} thoughts.`);

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('ERROR seeding database:', error);
    process.exit(1);
  }
}

// npm run seed 
seedDatabase();
