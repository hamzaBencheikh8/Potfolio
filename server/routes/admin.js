import express from 'express';
import authMiddleware from '../middleware/auth.js';
import pool from '../config/database.js';

const router = express.Router();

// ============ PROJECTS ============

// Get all projects
router.get('/projects', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM projects ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
});

// Create project
router.post('/projects', authMiddleware, async (req, res) => {
    try {
        const { title, description, technologies, liveUrl, githubUrl, image } = req.body;

        const result = await pool.query(
            'INSERT INTO projects (title, description, technologies, live_url, github_url, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, description, technologies, liveUrl || null, githubUrl || null, image || null]
        );

        res.status(201).json({ success: true, project: result.rows[0] });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Update project
router.put('/projects/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, technologies, liveUrl, githubUrl, image } = req.body;

        const result = await pool.query(
            'UPDATE projects SET title = $1, description = $2, technologies = $3, live_url = $4, github_url = $5, image = $6 WHERE id = $7 RETURNING *',
            [title, description, technologies, liveUrl || null, githubUrl || null, image || null, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ success: true, project: result.rows[0] });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete project
router.delete('/projects/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM projects WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// ============ CERTIFICATIONS ============

// Get all certifications
router.get('/certifications', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM certifications ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Get certifications error:', error);
        res.status(500).json({ error: 'Failed to retrieve certifications' });
    }
});

// Create certification
router.post('/certifications', authMiddleware, async (req, res) => {
    try {
        const { title, issuer, date, credentialUrl, badge } = req.body;

        const result = await pool.query(
            'INSERT INTO certifications (title, issuer, date, credential_url, badge) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, issuer, date, credentialUrl || null, badge || null]
        );

        res.status(201).json({ success: true, certification: result.rows[0] });
    } catch (error) {
        console.error('Create certification error:', error);
        res.status(500).json({ error: 'Failed to create certification' });
    }
});

// Update certification
router.put('/certifications/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, issuer, date, credentialUrl, badge } = req.body;

        const result = await pool.query(
            'UPDATE certifications SET title = $1, issuer = $2, date = $3, credential_url = $4, badge = $5 WHERE id = $6 RETURNING *',
            [title, issuer, date, credentialUrl || null, badge || null, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Certification not found' });
        }

        res.json({ success: true, certification: result.rows[0] });
    } catch (error) {
        console.error('Update certification error:', error);
        res.status(500).json({ error: 'Failed to update certification' });
    }
});

// Delete certification
router.delete('/certifications/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM certifications WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Certification not found' });
        }

        res.json({ success: true, message: 'Certification deleted' });
    } catch (error) {
        console.error('Delete certification error:', error);
        res.status(500).json({ error: 'Failed to delete certification' });
    }
});

// ============ TESTIMONIALS ============

// Get all testimonials (admin view)
router.get('/testimonials', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM testimonials ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Get testimonials error:', error);
        res.status(500).json({ error: 'Failed to retrieve testimonials' });
    }
});

// Approve testimonial
router.put('/testimonials/:id/approve', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'UPDATE testimonials SET approved = true WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        res.json({ success: true, testimonial: result.rows[0] });
    } catch (error) {
        console.error('Approve testimonial error:', error);
        res.status(500).json({ error: 'Failed to approve testimonial' });
    }
});

// Delete testimonial
router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM testimonials WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        res.json({ success: true, message: 'Testimonial deleted' });
    } catch (error) {
        console.error('Delete testimonial error:', error);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
});

// ============ DASHBOARD STATS ============

// Get dashboard statistics
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const projectsCount = await pool.query('SELECT COUNT(*) FROM projects');
        const certificationsCount = await pool.query('SELECT COUNT(*) FROM certifications');
        const testimonialsCount = await pool.query('SELECT COUNT(*) FROM testimonials');
        const pendingCount = await pool.query('SELECT COUNT(*) FROM testimonials WHERE approved = false');
        const approvedCount = await pool.query('SELECT COUNT(*) FROM testimonials WHERE approved = true');

        const stats = {
            totalProjects: parseInt(projectsCount.rows[0].count),
            totalCertifications: parseInt(certificationsCount.rows[0].count),
            totalTestimonials: parseInt(testimonialsCount.rows[0].count),
            pendingTestimonials: parseInt(pendingCount.rows[0].count),
            approvedTestimonials: parseInt(approvedCount.rows[0].count)
        };

        res.json(stats);
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Failed to retrieve statistics' });
    }
});

export default router;
