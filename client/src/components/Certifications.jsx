import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const certificationsPerPage = 6;

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                // Use absolute backend URL on Vercel, localhost in development
                const apiUrl = window.location.hostname.includes('vercel.app')
                    ? 'https://portfolio-backend-babn.onrender.com/api/certifications'
                    : 'http://localhost:5000/api/certifications';

                const response = await axios.get(apiUrl);
                setCertifications(response.data);
            } catch (err) {
                console.error('Failed to fetch certifications:', err);
                setError('Failed to load certifications');
            } finally {
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    // Pagination calculations
    const indexOfLastCert = currentPage * certificationsPerPage;
    const indexOfFirstCert = indexOfLastCert - certificationsPerPage;
    const currentCertifications = certifications.slice(indexOfFirstCert, indexOfLastCert);
    const totalPages = Math.ceil(certifications.length / certificationsPerPage);

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

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
                    {loading ? (
                        <div className="col-span-full text-center py-20">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyber-green border-r-transparent"></div>
                            <p className="mt-4 text-gray-400">Loading certifications...</p>
                        </div>
                    ) : error ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : certifications.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-400">No certifications found</p>
                        </div>
                    ) : (
                        currentCertifications.map((cert) => (
                            <motion.a
                                key={cert.id}
                                href={cert.credentialUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass p-6 rounded-xl border border-gray-700/50 hover:border-cyber-green/50 transition-all duration-300 group cursor-pointer"
                            >
                                {/* Icon */}
                                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    {cert.badge || '🎓'}
                                </div>

                                {/* Certification Title */}
                                <h3 className={`text-xl font-bold mb-2 ${cert.issuer === 'Google' ? 'text-cyber-green' : 'text-cyber-blue'} group-hover:text-cyber-green transition-colors duration-300`}>
                                    {cert.title}
                                </h3>

                                {/* Organization */}
                                <p className="text-gray-400 text-sm mb-2">
                                    {cert.issuer}
                                </p>

                                {/* Category Badge */}
                                {cert.category && (
                                    <div className="mb-2">
                                        <span className="inline-block px-2 py-1 text-xs font-medium bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 rounded-full">
                                            {cert.category}
                                        </span>
                                    </div>
                                )}

                                {/* Skills Tags */}
                                {cert.skills && Array.isArray(cert.skills) && cert.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {cert.skills.slice(0, 3).map((skill, idx) => (
                                            <span key={idx} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Grade Badge */}
                                {cert.grade && (
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 text-xs font-bold bg-cyber-green/10 text-cyber-green border border-cyber-green/30 rounded-full">
                                            Grade: {cert.grade}
                                        </span>
                                    </div>
                                )}

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
                        ))
                    )}
                </motion.div>

                {/* Pagination Controls */}
                {!loading && !error && certifications.length > certificationsPerPage && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <motion.button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                            whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${currentPage === 1
                                ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                                : 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/30'
                                }`}
                        >
                            ← Previous
                        </motion.button>

                        <div className="text-gray-400 font-mono">
                            <span className="text-cyber-green font-bold">{currentPage}</span> / {totalPages}
                        </div>

                        <motion.button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                            whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${currentPage === totalPages
                                ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                                : 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/30'
                                }`}
                        >
                            Next →
                        </motion.button>
                    </div>
                )}

                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl -z-10"></div>
            </div>
        </section >
    );
};

export default Certifications;
