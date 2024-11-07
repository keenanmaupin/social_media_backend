import express from 'express';
import mongoose from 'mongoose';
import { thoughtRouter } from './routes/api/thoughtRoutes.js';
import { userRouter } from './routes/api/userRoutes.js';
// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route setup
app.use('/api/thoughts', thoughtRouter);
app.use('/api/users', userRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork_db')
  .then(() => {
    console.log('Connected to the MongoDB database!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.listen(PORT, () => {
    console.log(`Finaly we are up and running on ${PORT}!`);
  });