import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStats } from '../../services/api';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await getStats();
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    const cards = [
        { title: 'Total Projects', value: stats?.totalProjects || 0, icon: '💼', color: 'cyber-green', link: '/admin/projects' },
        { title: 'Certifications', value: stats?.totalCertifications || 0, icon: '🎓', color: 'cyber-blue', link: '/admin/certifications' },
        { title: 'Testimonials', value: stats?.totalTestimonials || 0, icon: '💬', color: 'cyber-purple', link: '/admin/testimonials' },
        { title: 'Pending Approval', value: stats?.pendingTestimonials || 0, icon: '⏳', color: 'orange-500', link: '/admin/testimonials' },
    ];

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Overview of your portfolio content</p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={card.link}>
                            <div className={`glass p-6 rounded-xl border border-gray-700/50 hover:border-${card.color}/50 transition-all duration-300 cursor-pointer group`}>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-4xl">{card.icon}</span>
                                    <span className={`text-3xl font-bold text-${card.color} group-hover:scale-110 transition-transform`}>
                                        {card.value}
                                    </span>
                                </div>
                                <h3 className="text-gray-400 text-sm font-medium">{card.title}</h3>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass p-6 rounded-xl border border-gray-700/50"
            >
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/admin/projects">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full glass px-6 py-3 rounded-lg text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/10 transition-all duration-200"
                        >
                            ➕ Add New Project
                        </motion.button>
                    </Link>
                    <Link to="/admin/certifications">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full glass px-6 py-3 rounded-lg text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue/10 transition-all duration-200"
                        >
                            ➕ Add Certification
                        </motion.button>
                    </Link>
                    <Link to="/admin/testimonials">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full glass px-6 py-3 rounded-lg text-cyber-purple border border-cyber-purple/30 hover:bg-cyber-purple/10 transition-all duration-200"
                        >
                            👁️ Review Testimonials
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardPage;
