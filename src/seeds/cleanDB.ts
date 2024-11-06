import { User, Thought } from '../models/index.js';

const socialNetwork_db = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    console.log('User collection cleaned.');

    await Thought.deleteMany({});
    console.log('Thought collection cleaned.');

  } catch (err) {
    console.error('Error!:', err);
    process.exit(1);
  }
};

export default socialNetwork_db;
