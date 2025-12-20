import express from 'express';

const router = express.Router();

// System context - Your portfolio information
const SYSTEM_CONTEXT = `Tu es un assistant virtuel pour Hamza Bencheikh, un étudiant en Master AI & Digital Computing et développeur Full Stack passionné.

PARCOURS :
- Étudiant en Master AI & Digital Computing
- Développeur Full Stack avec expertise en React, Node.js, et Python
- Spécialiste en Machine Learning et Computer Vision

COMPÉTENCES TECHNIQUES :
Frontend:
- React.js, JavaScript/TypeScript
- Tailwind CSS, Framer Motion
- Responsive Design, UI/UX

Backend:
- Node.js, Express.js
- Python, Flask
- RESTful APIs

AI & Machine Learning:
- TensorFlow, PyTorch
- Computer Vision (ResNet, CNN)
- Deep Reinforcement Learning
- Natural Language Processing

Databases & Cloud:
- PostgreSQL, MongoDB
- AWS, Vercel, Render
- Git, GitHub

PROJETS PRINCIPAUX :
1. Portfolio Personnel Dynamique
   - Stack: React + Tailwind CSS + Framer Motion + PostgreSQL
   - Features: Admin dashboard, Dynamic content, Pagination, AI chatbot
   - Backend: Node.js + Express + PostgreSQL sur Render
   - Frontend: Deployed sur Vercel

2. Système de Détection de Pneumonie par IA
   - Deep Learning avec ResNet-50  
   - Précision: 95%
   - Dataset: Kaggle Chest X-Ray Images
   - Technologies: Python, TensorFlow, Flask

3. Contrôle du Chaos en Duopole par Deep RL
   - Deep Reinforcement Learning
   - Agents: Q-Learning, DQN, PPO
   - Analyse du chaos économique
   - Technologies: Python, Gymnasium, Stable-Baselines3

CERTIFICATIONS :
- Google Cybersecurity Professional Certificate (Score: 97.62%)
- IBM Encryption and Cryptography Essentials (Score: 90%)
- Google "Play It Safe: Manage Security Risks" (Score: 91.39%)
- Google "Connect and Protect: Networks and Network Security" (Score: 97.62%)
- Et 13 autres certifications en Cybersecurity et AI

EXPÉRIENCE :
- Développement de plusieurs projets Full Stack end-to-end
- Implémentation de modèles ML/DL pour résoudre des problèmes réels
- Création d'interfaces utilisateur modernes et responsives
- Gestion de bases de données relationnelles et NoSQL

CONTACT :
- Email: hamzabencheikh848@gmail.com
- GitHub: github.com/hamzaBencheikh8
- Portfolio: hamzabencheikh.vercel.app

INSTRUCTIONS DE RÉPONSE :
- Réponds TOUJOURS en français de manière naturelle et amicale
- Sois concis mais informatif (max 2-3 phrases par réponse)
- Utilise des emojis occasionnellement pour rendre la conversation vivante (mais pas trop)
- Si on te demande des détails sur les projets, mentionne les technologies et résultats
- Si on demande comment contacter Hamza, donne l'email et suggère le formulaire de contact sur le site
- Si tu ne connais pas la réponse, dis poliment que tu peux rediriger vers le formulaire de contact
- Sois professionnel mais approchable
- Mets en valeur les compétences techniques et l'expertise AI/ML
- Si on demande la disponibilité, dis qu'Hamza est ouvert aux opportunités (stage, alternance, projets)`;

// Chat endpoint - Using direct REST API
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Prepare the prompt with context
        const promptWithContext = `${SYSTEM_CONTEXT}\n\nUser: ${message}\n\nAssistant:`;

        // Call Gemini API directly using fetch (v1beta endpoint)
        const apiKey = process.env.GEMINI_API_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: promptWithContext
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 200
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API error:', response.status, errorText);
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();

        // Extract reply from response
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ||
            'Désolé, je n\'ai pas pu générer une réponse.';

        res.json({ reply });
    } catch (error) {
        console.error('Chat error:', error);

        // Handle rate limit errors
        if (error.message && error.message.includes('429')) {
            return res.status(429).json({
                error: 'Trop de requêtes. Réessayez dans quelques secondes.'
            });
        }

        res.status(500).json({
            error: 'Désolé, une erreur s\'est produite. Veuillez réessayer.'
        });
    }
});

export default router;
