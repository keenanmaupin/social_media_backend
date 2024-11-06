import { Request, Response } from 'express';
import Thought from '../models/Thought';

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Error creating thought', details: error });
  }
};

// Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching thoughts', details: error });
  }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching thought', details: error });
  }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting thought', details: error });
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Error adding reaction', details: error });
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions = thought.reactions.filter(
      (reaction) => reaction._id.toString() !== req.params.reactionId
    );
    await thought.save();
    res.json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Error removing reaction', details: error });
  }
};
