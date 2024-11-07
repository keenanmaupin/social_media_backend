import { Request, Response } from 'express';
import User from '../models/User.js';

// Create a new user
export const createUser = async (req:Request, res:Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get all users
export const getAllUsers = async (_req:Request, res:Response) => {
  try {
    const users = await User.find().populate('friends thoughts');
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a single user by ID
export async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId).populate('friends thoughts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error finding User' });
  }
}

// Update a user by ID
export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Error updating user', details: error });
  }
}


// Delete a user by ID
export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  return res.json({ message: 'User deleted' });
  } catch (error) {
  return res.status(500).json(error);
  }
}

// Add a friend to a user
export async function addFriend(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: 'Already friends' });
    }
    user.friends.push(friend._id);
    friend.friends.push(user._id);
    await user.save();
    await friend.save();
    return res.json({ message: 'Friend added' });
  } catch (error) {
    return res.status(400).json(error);
  }
}

// Remove a friend from a user
export const removeFriend = async (req:Request, res:Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found' });
    }
    user.friends = user.friends.filter((f: { toString: () => any; }) => f.toString() !== friend._id.toString());
    friend.friends = friend.friends.filter((f: { toString: () => any; }) => f.toString() !== user._id.toString());
    await user.save();
    await friend.save();
    return res.json({ message: 'Friend removed' });
  } catch (error) {
    return res.status(400).json(error);
  }
};
