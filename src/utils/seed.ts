import mongoose from 'mongoose';
import User from './models/User';
import Thought from './models/Thought';

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/social_network'; // Replace with your actual MongoDB URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// Define seed data
const seedUsers = [
  {
    username: 'starski',
    email: 'starski@example.com',
    friends: [],
  },
  {
    username: 'hutch',
    email: 'hutch@example.com',
    friends: [],
  },
  {
    username: 'challenger',
    email: 'challenger@example.com',
    friends: [],
  },
];

const seedThoughts = [
  {
    thoughtText: 'This is a thought by starski',
    username: 'starski',
    reactions: [
      {
        reactionBody: 'Nice thought!',
        username: 'hutch',
      },
    ],
  },
  {
    thoughtText: 'Another interesting thought by challenger',
    username: 'challenger',
    reactions: [
      {
        reactionBody: 'Get errr done!!',
        username: 'starski',
      },
    ],
  },
];

// Seed function to add users and thoughts
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert seed data
    const createdUsers = await User.insertMany(seedUsers);
    console.log('Users seeded:', createdUsers);

    // Link thoughts to users and insert
    for (const thoughtData of seedThoughts) {
      const user = await User.findOne({ username: thoughtData.username });
      if (user) {
        const thought = new Thought(thoughtData);
        await thought.save();
        user.thoughts.push(thought._id);
        await user.save();
        console.log(`Thought by ${thoughtData.username} seeded`);
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run 
seedDatabase();
