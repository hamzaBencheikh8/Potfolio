import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
    const timeline = [
        {
            year: '2024-2026',
            degree: 'Master in AI & Digital Computing',
            institution: 'FST Béni Mellal',
            status: 'Current M2',
            color: 'cyber-green'
        },
        {
            year: '2023-2024',
            degree: 'License in Distributed Systems (SIR)',
            institution: 'FST Marrakech',
            status: 'Completed',
            color: 'cyber-blue'
        },
        {
            year: '2021-2023',
            degree: 'DEUST MIPC',
            institution: 'FST Marrakech',
            status: 'Completed',
            color: 'cyber-purple'
        }
    ];

    return (
        <section id="education" className="py-20 px-6 bg-dark-card/30">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                        Education & <span className="text-cyber-purple">Timeline</span>
                    </h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyber-green via-cyber-blue to-cyber-purple" />

                        {/* Timeline Items */}
                        <div className="space-y-12">
                            {timeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                                    className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="glass p-6 rounded-xl"
                                        >
                                            <div className={`text-${item.color} font-bold text-lg mb-2`}>
                                                {item.year}
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{item.degree}</h3>
                                            <p className="text-gray-400 mb-1">{item.institution}</p>
                                            <span className={`inline-block px-3 py-1 text-xs rounded-full border border-${item.color} text-${item.color}`}>
                                                {item.status}
                                            </span>
                                        </motion.div>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="w-2/12 flex justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.5 }}
                                            className={`w-4 h-4 rounded-full bg-${item.color} border-4 border-dark-bg shadow-lg`}
                                            style={{
                                                boxShadow: `0 0 20px var(--${item.color})`
                                            }}
                                        />
                                    </div>

                                    {/* Empty Space */}
                                    <div className="w-5/12" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
