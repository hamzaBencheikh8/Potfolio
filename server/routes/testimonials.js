import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import pool from '../config/database.js';

const router = express.Router();

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

// GET all approved testimonials (for public display)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM testimonials WHERE approved = true ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Get testimonials error:', error);
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
        const { name, position, message } = req.body;

        // Create new testimonial (defaults to approved=false, will need admin approval)
        const result = await pool.query(
            'INSERT INTO testimonials (name, position, message, approved) VALUES ($1, $2, $3, $4) RETURNING *',
            [name.trim(), position?.trim() || null, message.trim(), false]
        );

        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully! It will appear after approval.',
            testimonial: result.rows[0]
        });
    } catch (error) {
        console.error('Create testimonial error:', error);
        res.status(500).json({ error: 'Failed to save testimonial' });
    }
});

export default router;
