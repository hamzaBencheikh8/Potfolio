import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
    const skillsData = {
        'AI & Data': [
            'Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'ResNet-50', 'NLP', 'OpenCV'
        ],
        'Backend': [
            'Java Spring Boot', 'Node.js', 'Python (Flask)', 'Microservices'
        ],
        'Frontend': [
            'React.js', 'Angular', 'Bootstrap'
        ],
        'Tools/DevOps': [
            'Docker', 'Git', 'Linux', 'Hadoop/Spark', 'MongoDB'
        ]
    };

    // Fixed: Using predefined classes instead of dynamic template literals
    const getCategoryClasses = (category) => {
        const classMap = {
            'AI & Data': {
                title: 'text-cyber-green',
                tag: 'border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-dark-bg'
            },
            'Backend': {
                title: 'text-cyber-blue',
                tag: 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-dark-bg'
            },
            'Frontend': {
                title: 'text-cyber-purple',
                tag: 'border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-dark-bg'
            },
            'Tools/DevOps': {
                title: 'text-cyan-400',
                tag: 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-dark-bg'
            }
        };
        return classMap[category];
    };

    return (
        <section id="skills" className="py-20 px-6 bg-dark-card/30">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        Skills & <span className="text-cyber-blue">Technologies</span>
                    </h2>

                    {/* Skills Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(skillsData).map(([category, skills], idx) => {
                            const classes = getCategoryClasses(category);
                            return (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    className="glass p-6 rounded-xl"
                                >
                                    <h3 className={`text-2xl font-bold mb-4 ${classes.title}`}>
                                        {category}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {skills.map((skill, skillIdx) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                whileHover={{ scale: 1.1, y: -5 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
                                                className={`px-4 py-2 glass rounded-full text-sm font-medium border ${classes.tag} transition-all duration-300 cursor-default`}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
