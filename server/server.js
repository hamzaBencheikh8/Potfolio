import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import contactRoutes from './routes/contact.js';
import projectRoutes from './routes/projects.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Fixed: restrict to frontend URL
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
