import express from 'express';
import authMiddleware from '../middleware/auth.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');
const CERTIFICATIONS_FILE = path.join(__dirname, '../data/certifications.json');
const TESTIMONIALS_FILE = path.join(__dirname, '../data/testimonials.json');

// Ensure data files exist
async function ensureFile(filePath, defaultData = []) {
    try {
        await fs.access(filePath);
    } catch {
        const dataDir = path.dirname(filePath);
        await fs.mkdir(dataDir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
    }
}

// ============ PROJECTS ============

// Get all projects
router.get('/projects', authMiddleware, async (req, res) => {
    try {
        await ensureFile(PROJECTS_FILE);
        const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve projects' });
    }
});

// Create project
router.post('/projects', authMiddleware, async (req, res) => {
    try {
        await ensureFile(PROJECTS_FILE);
        const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
        const projects = JSON.parse(data);

        const newProject = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };

        projects.push(newProject);
        await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));

        res.status(201).json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Update project
router.put('/projects/:id', authMiddleware, async (req, res) => {
    try {
        await ensureFile(PROJECTS_FILE);
        const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
        const projects = JSON.parse(data);

        const index = projects.findIndex(p => p.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }

        projects[index] = { ...projects[index], ...req.body, updatedAt: new Date().toISOString() };
        await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));

        res.json({ success: true, project: projects[index] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// Delete project
router.delete('/projects/:id', authMiddleware, async (req, res) => {
    try {
        await ensureFile(PROJECTS_FILE);
        const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
        let projects = JSON.parse(data);

        const index = projects.findIndex(p => p.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }

        projects = projects.filter(p => p.id != req.params.id);
        await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));

        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// ============ CERTIFICATIONS ============

// Get all certifications
router.get('/certifications', authMiddleware, async (req, res) => {
    try {
        await ensureFile(CERTIFICATIONS_FILE);
        const data = await fs.readFile(CERTIFICATIONS_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve certifications' });
    }
});

// Create certification
router.post('/certifications', authMiddleware, async (req, res) => {
    try {
        await ensureFile(CERTIFICATIONS_FILE);
        const data = await fs.readFile(CERTIFICATIONS_FILE, 'utf-8');
        const certifications = JSON.parse(data);

        const newCert = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString()
        };

        certifications.push(newCert);
        await fs.writeFile(CERTIFICATIONS_FILE, JSON.stringify(certifications, null, 2));

        res.status(201).json({ success: true, certification: newCert });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create certification' });
    }
});

// Update certification
router.put('/certifications/:id', authMiddleware, async (req, res) => {
    try {
        await ensureFile(CERTIFICATIONS_FILE);
        const data = await fs.readFile(CERTIFICATIONS_FILE, 'utf-8');
        const certifications = JSON.parse(data);

        const index = certifications.findIndex(c => c.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Certification not found' });
        }

        certifications[index] = { ...certifications[index], ...req.body, updatedAt: new Date().toISOString() };
        await fs.writeFile(CERTIFICATIONS_FILE, JSON.stringify(certifications, null, 2));

        res.json({ success: true, certification: certifications[index] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update certification' });
    }
});

// Delete certification
router.delete('/certifications/:id', authMiddleware, async (req, res) => {
    try {
        await ensureFile(CERTIFICATIONS_FILE);
        const data = await fs.readFile(CERTIFICATIONS_FILE, 'utf-8');
        let certifications = JSON.parse(data);

        const index = certifications.findIndex(c => c.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Certification not found' });
        }

        certifications = certifications.filter(c => c.id != req.params.id);
        await fs.writeFile(CERTIFICATIONS_FILE, JSON.stringify(certifications, null, 2));

        res.json({ success: true, message: 'Certification deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete certification' });
    }
});

// ============ TESTIMONIALS ============

// Get all testimonials (admin view)
router.get('/testimonials', authMiddleware, async (req, res) => {
    try {
        await ensureFile(TESTIMONIALS_FILE);
        const data = await fs.readFile(TESTIMONIALS_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve testimonials' });
    }
});

// Approve testimonial
router.put('/testimonials/:id/approve', authMiddleware, async (req, res) => {
    try {
        await ensureFile(TESTIMONIALS_FILE);
        const data = await fs.readFile(TESTIMONIALS_FILE, 'utf-8');
        const testimonials = JSON.parse(data);

        const index = testimonials.findIndex(t => t.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        testimonials[index].approved = true;
        await fs.writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));

        res.json({ success: true, testimonial: testimonials[index] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve testimonial' });
    }
});

// Delete testimonial
router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
    try {
        await ensureFile(TESTIMONIALS_FILE);
        const data = await fs.readFile(TESTIMONIALS_FILE, 'utf-8');
        let testimonials = JSON.parse(data);

        const index = testimonials.findIndex(t => t.id == req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        testimonials = testimonials.filter(t => t.id != req.params.id);
        await fs.writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2));

        res.json({ success: true, message: 'Testimonial deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
});

// ============ DASHBOARD STATS ============

// Get dashboard statistics
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        await ensureFile(PROJECTS_FILE);
        await ensureFile(CERTIFICATIONS_FILE);
        await ensureFile(TESTIMONIALS_FILE);

        const projectsData = await fs.readFile(PROJECTS_FILE, 'utf-8');
        const certificationsData = await fs.readFile(CERTIFICATIONS_FILE, 'utf-8');
        const testimonialsData = await fs.readFile(TESTIMONIALS_FILE, 'utf-8');

        const projects = JSON.parse(projectsData);
        const certifications = JSON.parse(certificationsData);
        const testimonials = JSON.parse(testimonialsData);

        const stats = {
            totalProjects: projects.length,
            totalCertifications: certifications.length,
            totalTestimonials: testimonials.length,
            pendingTestimonials: testimonials.filter(t => !t.approved).length,
            approvedTestimonials: testimonials.filter(t => t.approved).length
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve statistics' });
    }
});

export default router;
