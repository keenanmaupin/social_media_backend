import express from 'express';
import mongoose from 'mongoose';
import { thoughtRouter } from './routes/api/thoughtRoutes';
import { userRouter } from './routes/api/userRoutes';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route setup
app.use('/api/thoughts', thoughtRouter);
app.use('/api/users', userRouter);

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/socialNetwork_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit process with failure code
  });
