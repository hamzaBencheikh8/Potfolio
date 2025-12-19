import React from 'react';
import { motion } from 'framer-motion';

const Certifications = () => {
    const certifications = [
        {
            id: 1,
            name: "Machine Learning Specialization",
            organization: "Coursera (Stanford University)",
            date: "2024",
            icon: "🎓",
            color: "cyber-green",
            link: "#"
        },
        {
            id: 2,
            name: "AWS Certified Solutions Architect",
            organization: "Amazon Web Services",
            date: "2024",
            icon: "☁️",
            color: "orange-500",
            link: "#"
        },
        {
            id: 3,
            name: "Deep Learning Specialization",
            organization: "DeepLearning.AI",
            date: "2023",
            icon: "🧠",
            color: "cyber-blue",
            link: "#"
        },
        {
            id: 4,
            name: "Google Cloud Associate",
            organization: "Google Cloud",
            date: "2023",
            icon: "🌐",
            color: "blue-500",
            link: "#"
        },
        {
            id: 5,
            name: "Full Stack Web Development",
            organization: "Udemy",
            date: "2023",
            icon: "💻",
            color: "cyber-purple",
            link: "#"
        },
        {
            id: 6,
            name: "Advanced Python Programming",
            organization: "DataCamp",
            date: "2023",
            icon: "🐍",
            color: "yellow-500",
            link: "#"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <section id="certifications" className="py-20 relative">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Certifications & <span className="text-cyber-green">Achievements</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyber-green to-cyber-blue mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Professional certifications and continuous learning journey in AI, Cloud Computing, and Full Stack Development
                    </p>
                </motion.div>

                {/* Certifications Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {certifications.map((cert) => (
                        <motion.a
                            key={cert.id}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="glass p-6 rounded-xl border border-gray-700/50 hover:border-cyber-green/50 transition-all duration-300 group cursor-pointer"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {cert.icon}
                            </div>

                            {/* Certification Name */}
                            <h3 className={`text-xl font-bold mb-2 text-${cert.color} group-hover:text-cyber-green transition-colors duration-300`}>
                                {cert.name}
                            </h3>

                            {/* Organization */}
                            <p className="text-gray-400 text-sm mb-3">
                                {cert.organization}
                            </p>

                            {/* Date */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-mono">
                                    {cert.date}
                                </span>
                                <motion.span
                                    className="text-cyber-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    →
                                </motion.span>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyber-green/30 group-hover:border-cyber-green transition-colors duration-300"></div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl -z-10"></div>
            </div>
        </section>
    );
};

export default Certifications;
