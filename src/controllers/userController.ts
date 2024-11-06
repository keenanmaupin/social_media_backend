const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('friends thoughts');
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Additional CRUD operations for updateUser, deleteUser, addFriend, and removeFriend
