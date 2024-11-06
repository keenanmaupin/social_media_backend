const Thought = require('../models/Thought');

// Create a new thought
exports.createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get all thoughts
exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Additional CRUD operations for updateThought, deleteThought, addReaction, and removeReaction
