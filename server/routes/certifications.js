import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Utility function to convert snake_case to camelCase
const toCamelCase = (obj) => {
    const newObj = {};
    for (const key in obj) {
        const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        newObj[camelKey] = obj[key];
    }
    return newObj;
};

// Public route - Get all certifications
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM certifications ORDER BY created_at DESC'
        );

        const certifications = result.rows.map(toCamelCase);
        res.json(certifications);
    } catch (error) {
        console.error('Get certifications error:', error);
        res.status(500).json({ error: 'Failed to retrieve certifications' });
    }
});

export default router;
