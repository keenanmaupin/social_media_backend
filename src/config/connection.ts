import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork_db', {
            serverSelectionTimeoutMS: 20000, // 20 seconds
            socketTimeoutMS: 20000,         // 20 seconds
        });
        console.log('Database connected.');

        // Additional logging for connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to database.');
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose connection disconnected.');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        return mongoose.connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
};

// Handle unexpected disconnections and attempt reconnection
mongoose.connection.on('disconnected', async () => {
    console.warn('Database disconnected. Attempting reconnection...');
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork_db',
            {
                serverSelectionTimeoutMS: 20000, // 20 seconds
                socketTimeoutMS: 20000,         // 20 seconds
            });
        console.log('Database reconnected successfully.');
    } catch (error) {
        console.error('Database reconnection failed:', error);
    }
});

export default db;
