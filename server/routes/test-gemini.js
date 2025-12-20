import express from 'express';

const router = express.Router();

// Test endpoint to list available Gemini models
router.get('/', async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        // Call ListModels API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({
                error: 'Failed to list models',
                status: response.status,
                details: errorText
            });
        }

        const data = await response.json();

        // Extract model names and their supported methods
        const models = data.models?.map(model => ({
            name: model.name,
            displayName: model.displayName,
            supportedMethods: model.supportedGenerationMethods
        })) || [];

        res.json({
            totalModels: models.length,
            models: models,
            rawData: data
        });

    } catch (error) {
        console.error('ListModels error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

export default router;
