import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Fetch projects from backend
        // Check if we are in production based on hostname (vercel.app)
        const isProduction = window.location.hostname.includes('vercel.app');
        const apiUrl = isProduction
            ? 'https://portfolio-backend-babn.onrender.com/api/projects'
            : 'http://localhost:5000/api/projects';



        axios.get(apiUrl)
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                // Fallback to local data if backend is not available
                setProjects([
                    {
                        _id: '1',
                        title: 'Diabetic Retinopathy Detection',
                        description: 'Medical image classification using CNN ResNet-50 and Transfer Learning.',
                        fullDescription: 'A deep learning solution designed to detect diabetic retinopathy from retinal fundus images. Leveraging the power of ResNet-50 and Transfer Learning, this system achieves high accuracy in classifying different stages of the disease, aiding ophthalmologists in early diagnosis.',
                        features: [
                            'High-accuracy classification using ResNet-50',
                            'Automated image preprocessing and augmentation',
                            'Transfer learning for optimized performance on small datasets',
                            'Heatmap visualization for interpretability (Grad-CAM)'
                        ],
                        github: 'https://github.com/hamzaBencheikh8',
                        challenges: 'Overcoming the class imbalance in the dataset and ensuring the model generalized well to unseen images from different sources.',
                        tags: ['Python', 'PyTorch', 'Image Processing']
                    },
                    {
                        _id: '2',
                        title: 'Visually Impaired Guidance App',
                        description: 'Full stack web app for localization in Mecca. Accessible interfaces.',
                        fullDescription: 'A specialized navigation application built for visually impaired pilgrims in Mecca. It uses geolocation and voice synthesis to provide real-time guidance, ensuring a safer and more independent pilgrimage experience.',
                        features: [
                            'Real-time voice-guided navigation',
                            'High-contrast accessible UI designs',
                            'Integration with mapping APIs for precise localization',
                            'Emergency SOS feature for immediate assistance'
                        ],
                        github: 'https://github.com/hamzaBencheikh8',
                        challenges: 'Designing a UI that is truly accessible for the visually impaired while maintaining accurate real-time location tracking in crowded areas.',
                        tags: ['React.js', 'Node.js', 'MongoDB']
                    },
                    {
                        _id: '3',
                        title: 'Traffic Sign Recognition System',
                        description: 'Real-time system for autonomous vehicles using Computer Vision.',
                        fullDescription: 'An efficient computer vision system capable of recognizing and classifying traffic signs in real-time. Designed for autonomous vehicle applications, it detects speed limits, warnings, and stops with low latency.',
                        features: [
                            'Real-time detection using OpenCV',
                            'Robust classification with custom CNN architecture',
                            'Works under varying lighting conditions',
                            'Optimized for embedded systems'
                        ],
                        github: 'https://github.com/hamzaBencheikh8',
                        challenges: 'Ensuring real-time performance on limited hardware and handling occluded or damaged traffic signs.',
                        tags: ['Python', 'OpenCV', 'CNN']
                    },
                    {
                        _id: '4',
                        title: 'Smart Farm IoT',
                        description: 'Automatic plant disease detection and culture parameter analysis.',
                        fullDescription: 'An IoT-based smart farming solution that monitors environmental parameters and detects plant diseases using image analysis. It provides farmers with actionable insights to improve crop yield and resource efficiency.',
                        features: [
                            'Real-time monitoring of soil moisture, temperature, and humidity',
                            'Disease detection using camera modules and ML',
                            'Mobile dashboard for remote monitoring',
                            'Automated irrigation control system'
                        ],
                        github: 'https://github.com/hamzaBencheikh8',
                        challenges: 'Integrating disparate hardware sensors with the software stack and ensuring reliable data transmission in a farm environment.',
                        tags: ['IoT Sensors', 'Machine Learning', 'Python']
                    }
                ]);
            });
    }, []);

    const getTagColor = (tag) => {
        const lowerTag = tag.toLowerCase();
        if (lowerTag.includes('python') || lowerTag.includes('pytorch') || lowerTag.includes('ml') || lowerTag.includes('machine')) {
            return 'border-cyber-green text-cyber-green hover:bg-cyber-green';
        }
        if (lowerTag.includes('react') || lowerTag.includes('node') || lowerTag.includes('web')) {
            return 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue';
        }
        return 'border-cyber-purple text-cyber-purple hover:bg-cyber-purple';
    };

    return (
        <section id="projects" className="py-20 px-6">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        Featured <span className="text-cyber-green">Projects</span>
                    </h2>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.id || project._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="glass p-6 rounded-xl neon-border-blue group cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Project Image */}
                                {project.image && (
                                    <div className="mb-4 overflow-hidden rounded-lg">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* Project Title */}
                                <h3 className="text-2xl font-bold mb-3 text-cyber-green group-hover:text-cyber-blue transition-colors duration-300">
                                    {project.title}
                                </h3>

                                {/* Project Description */}
                                <p className="text-gray-300 mb-4 leading-relaxed break-words overflow-hidden">
                                    {project.description}
                                </p>

                                {/* Tags/Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {(project.technologies || project.tags || []).map((tag) => (
                                        <span
                                            key={tag}
                                            className={`px-3 py-1 text-xs font-medium rounded-full border glass 
                        ${getTagColor(tag)} hover:text-dark-bg transition-all duration-300`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Hover Effect Indicator */}
                                <motion.div
                                    className="mt-4 flex items-center text-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <span className="text-sm font-medium">View Details</span>
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div >
            </div >

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass max-w-2xl w-full p-8 rounded-2xl relative border border-cyber-blue shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Project Image */}
                            {selectedProject.image && (
                                <div className="mb-6 overflow-hidden rounded-xl">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            )}

                            <h3 className="text-3xl font-bold mb-4 text-cyber-green">{selectedProject.title}</h3>

                            {/* Project Metadata Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedProject.status && (
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${selectedProject.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                        selectedProject.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                        }`}>
                                        {selectedProject.status === 'Completed' ? '✅' : selectedProject.status === 'In Progress' ? '🚧' : '📦'} {selectedProject.status}
                                    </span>
                                )}
                                {selectedProject.projectType && (
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">
                                        {selectedProject.projectType === 'Personal' ? '👤' :
                                            selectedProject.projectType === 'Academic' ? '🎓' :
                                                selectedProject.projectType === 'Professional' ? '💼' : '🌐'} {selectedProject.projectType}
                                    </span>
                                )}
                            </div>

                            {/* Project Info Row */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                                {selectedProject.completionDate && (
                                    <div className="flex items-center gap-1">
                                        <span>📅</span>
                                        <span>{new Date(selectedProject.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                                    </div>
                                )}
                                {selectedProject.teamSize && (
                                    <div className="flex items-center gap-1">
                                        <span>👥</span>
                                        <span>{selectedProject.teamSize}</span>
                                    </div>
                                )}
                                {selectedProject.duration && (
                                    <div className="flex items-center gap-1">
                                        <span>⏱️</span>
                                        <span>{selectedProject.duration}</span>
                                    </div>
                                )}
                                {selectedProject.client && (
                                    <div className="flex items-center gap-1">
                                        <span>🏢</span>
                                        <span>{selectedProject.client}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {(selectedProject.technologies || selectedProject.tags || []).map((tag) => (
                                    <span key={tag} className={`px-3 py-1 text-xs font-medium rounded-full border glass ${getTagColor(tag)}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                {selectedProject.fullDescription || selectedProject.description}
                            </p>

                            {/* Key Features Section */}
                            {(selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0) && (
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-cyber-blue mb-3">✨ Key Features</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                                        {selectedProject.keyFeatures.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Challenges Section */}
                            {selectedProject.challenges && (
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-cyber-blue mb-3">💪 Challenges</h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        {selectedProject.challenges}
                                    </p>
                                </div>
                            )}

                            {/* Results Section */}
                            {selectedProject.results && (
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-cyber-blue mb-3">🎯 Results & Impact</h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        {selectedProject.results}
                                    </p>
                                </div>
                            )}

                            {selectedProject.features && (
                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold text-cyber-blue mb-3">Key Features</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                                        {selectedProject.features.map((feature, i) => (
                                            <li key={i}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedProject.challenges && (
                                <div className="mb-8">
                                    <h4 className="text-xl font-semibold text-cyber-blue mb-3">Challenges & Impact</h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        {selectedProject.challenges}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-4">
                                {selectedProject.demoVideoUrl && (
                                    <a
                                        href={selectedProject.demoVideoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                        </svg>
                                        Watch Demo
                                    </a>
                                )}
                                {(selectedProject.githubUrl || selectedProject.github) && (
                                    <a
                                        href={selectedProject.githubUrl || selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        View Code
                                    </a>
                                )}
                                {selectedProject.demo && (
                                    <a
                                        href={selectedProject.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-cyber-green text-dark-bg font-bold rounded-lg hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
};

export default Projects;
