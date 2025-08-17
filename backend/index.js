import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transactions.js';
import insightRoutes from './routes/insights.js';

// Load environment variables from the root .env file
dotenv.config({ path: '../.env' });

const app = express();
const port = 3002; // Using a different port to avoid conflicts

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/insights', insightRoutes);

app.listen(port, () => {
    console.log(`✅ Finance Tracker server listening at http://localhost:${port}`);
});