import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM projects ORDER BY created_at DESC'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
});

// Get project by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM projects WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Failed to retrieve project' });
    }
});

export default router;
