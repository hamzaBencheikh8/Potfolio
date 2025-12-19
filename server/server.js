import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDatabase from './config/initDB.js';
import contactRoutes from './routes/contact.js';
import projectRoutes from './routes/projects.js';
import testimonialsRoutes from './routes/testimonials.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy - Required for Render and rate limiting
app.set('trust proxy', 1);

// CORS Configuration - Allow all Vercel deployments
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        // Allow localhost for development
        if (origin.includes('localhost')) return callback(null, true);

        // Allow all Vercel deployments (production + previews)
        if (origin.endsWith('.vercel.app')) return callback(null, true);

        // Reject other origins
        callback(new Error('Not allowed by CORS'));
    },
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
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running!' });
});

// Initialize database and start server
async function startServer() {
    try {
        // Initialize database tables
        await initializeDatabase();

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
