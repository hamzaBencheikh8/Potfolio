import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to testimonials JSON file
const TESTIMONIALS_FILE = path.join(__dirname, '../data/testimonials.json');

// Rate limiting: 10 testimonials per 15 minutes
const testimonialLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { error: 'Too many testimonials submitted. Please try again later.' }
});

// Validation rules
const validateTestimonial = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('position')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Position must be less than 100 characters'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 500 })
        .withMessage('Message must be between 10 and 500 characters')
];

// Ensure testimonials file exists
async function ensureTestimonialsFile() {
    try {
        await fs.access(TESTIMONIALS_FILE);
    } catch {
        // Create data directory if it doesn't exist
        const dataDir = path.dirname(TESTIMONIALS_FILE);
        await fs.mkdir(dataDir, { recursive: true });
        // Create empty testimonials file
        await fs.writeFile(TESTIMONIALS_FILE, JSON.stringify([], null, 2));
    }
}

// GET all testimonials
router.get('/', async (req, res) => {
    try {
        await ensureTestimonialsFile();
        const data = await fs.readFile(TESTIMONIALS_FILE, 'utf-8');
        const testimonials = JSON.parse(data);
        res.json(testimonials);
    } catch (error) {
        console.error('Error reading testimonials:', error);
        res.status(500).json({ error: 'Failed to retrieve testimonials' });
    }
});

// POST new testimonial
router.post('/', testimonialLimiter, validateTestimonial, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await ensureTestimonialsFile();

        const { name, position, message } = req.body;

        // Read existing testimonials
        const data = await fs.readFile(TESTIMONIALS_FILE, 'utf-8');
        const testimonials = JSON.parse(data);

        // Create new testimonial
        const newTestimonial = {
            id: Date.now(),
            name: name.trim(),
            position: position?.trim() || '',
            message: message.trim(),
            date: new Date().toISOString(),
            approved: true // Auto-approve for now
        };

        // Add to beginning of array (newest first)
        testimonials.unshift(newTestimonial);

        // Keep only last 50 testimonials
        const limitedTestimonials = testimonials.slice(0, 50);

        // Save to file
        await fs.writeFile(
            TESTIMONIALS_FILE,
            JSON.stringify(limitedTestimonials, null, 2)
        );

        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully!',
            testimonial: newTestimonial
        });
    } catch (error) {
        console.error('Error saving testimonial:', error);
        res.status(500).json({ error: 'Failed to save testimonial' });
    }
});

export default router;
