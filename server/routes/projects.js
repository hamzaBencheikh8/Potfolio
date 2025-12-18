import express from 'express';
import projectData from '../models/projectData.js';

const router = express.Router();

// Get all projects
router.get('/', (req, res) => {
    res.status(200).json(projectData);
});

// Get project by ID
router.get('/:id', (req, res) => {
    const project = projectData.find(p => p._id === req.params.id);

    if (project) {
        res.status(200).json(project);
    } else {
        res.status(404).json({ error: 'Project not found' });
    }
});

export default router;
