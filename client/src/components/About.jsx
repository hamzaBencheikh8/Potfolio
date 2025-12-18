import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        About <span className="text-cyber-green">Me</span>
                    </h2>

                    {/* Content Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass p-8 md:p-12 rounded-2xl neon-border-green"
                    >
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            Passionately combining{' '}
                            <span className="text-cyber-blue font-semibold">Deep Learning (Computer Vision)</span>{' '}
                            expertise with solid know-how in{' '}
                            <span className="text-cyber-green font-semibold">Java Spring Boot & React</span>.
                            Currently an M2 student seeking a graduation internship (PFE) to design innovative
                            solutions in{' '}
                            <span className="text-cyber-purple font-semibold">OCR, NLP, and IoT</span>.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center p-4 glass rounded-lg">
                                <div className="text-3xl font-bold text-cyber-green mb-2">4+</div>
                                <div className="text-gray-400">Major Projects</div>
                            </div>
                            <div className="text-center p-4 glass rounded-lg">
                                <div className="text-3xl font-bold text-cyber-blue mb-2">M2</div>
                                <div className="text-gray-400">AI & Computing</div>
                            </div>
                            <div className="text-center p-4 glass rounded-lg">
                                <div className="text-3xl font-bold text-cyber-purple mb-2">Full Stack</div>
                                <div className="text-gray-400">Developer</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
