import { Request, Response } from 'express';
import Thought from '../models/Thought.js';

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Error creating thought', details: error });
  }
};

// Update a thought by ID
export async function updateThought(req: Request, res: Response) {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (error) {
    return res.status(400).json({ error: 'Error updating thought', details: error });
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
export async function getThoughtById(req: Request, res: Response) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching thought', details: error });
  }
}

// Delete a thought by ID
export async function deleteThought(req: Request, res: Response) {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting thought', details: error });
  }
}

// Add a reaction to a thought
export async function addReaction(req: Request, res: Response) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    return res.status(201).json(thought);
  } catch (error) {
    return res.status(400).json({ error: 'Error adding reaction', details: error });
  }
}

// Remove a reaction from a thought
export async function removeReaction(req: Request, res: Response) {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.filter(
      (reaction: { _id: { toString: () => string; }; }) => reaction._id.toString() !== req.params.reactionId
    );
    await thought.save();
    return res.json(thought);
  } catch (error) {
    return res.status(400).json({ error: 'Error removing reaction', details: error });
  }
}
