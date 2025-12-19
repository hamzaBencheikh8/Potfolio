import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: '', position: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [visibleCount, setVisibleCount] = useState(4); // Show 4 testimonials initially

    // API URL (production vs development)
    const apiUrl = import.meta.env.PROD
        ? 'https://portfolio-backend-babn.onrender.com/api/testimonials'
        : 'http://localhost:5000/api/testimonials';

    // Fetch testimonials on mount
    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(apiUrl);
            setTestimonials(response.data);
        } catch (err) {
            console.error('Error fetching testimonials:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await axios.post(apiUrl, formData);
            setSuccess(true);
            setFormData({ name: '', position: '', message: '' });
            // Refresh testimonials
            fetchTestimonials();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit testimonial. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="testimonials" className="py-20 relative">
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
                        What People <span className="text-cyber-green">Say</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-cyber-green to-cyber-blue mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Share your thoughts and feedback. Your testimonial helps me grow!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Testimonial Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="glass p-8 rounded-xl border border-gray-700/50"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-cyber-green">
                            Leave a Testimonial
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    Your Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    maxLength={50}
                                    className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    Position / Company (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    maxLength={100}
                                    className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none transition-colors"
                                    placeholder="Software Engineer at Google"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    Your Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    minLength={10}
                                    maxLength={500}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-dark-bg/50 border border-gray-700 rounded-lg text-white focus:border-cyber-green focus:outline-none transition-colors resize-none"
                                    placeholder="Share your thoughts..."
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.message.length}/500 characters
                                </p>
                            </div>

                            {/* Success Message */}
                            <AnimatePresence>
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-cyber-green/10 border border-cyber-green/30 text-cyber-green px-4 py-3 rounded-lg"
                                    >
                                        ✓ Thank you! Your testimonial has been submitted successfully.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full glass px-6 py-3 rounded-full text-cyber-green border border-cyber-green hover:bg-cyber-green hover:text-dark-bg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'Submit Testimonial'}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Testimonials Display */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        {testimonials.length === 0 ? (
                            <div className="glass p-8 rounded-xl border border-gray-700/50 text-center">
                                <p className="text-gray-400">
                                    No testimonials yet. Be the first to leave one! 💬
                                </p>
                            </div>
                        ) : (
                            <>
                                {testimonials.slice(0, visibleCount).map((testimonial, index) => (
                                    <motion.div
                                        key={testimonial.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass p-6 rounded-xl border border-gray-700/50 hover:border-cyber-green/30 transition-colors"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-green to-cyber-blue flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                                {testimonial.name.charAt(0).toUpperCase()}
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-bold text-white">
                                                    {testimonial.name}
                                                </h4>
                                                {testimonial.position && (
                                                    <p className="text-xs text-gray-400 mb-2">
                                                        {testimonial.position}
                                                    </p>
                                                )}
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    "{testimonial.message}"
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {new Date(testimonial.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Load More Button */}
                                {visibleCount < testimonials.length && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setVisibleCount(prev => prev + 4)}
                                        className="w-full glass px-6 py-3 rounded-xl text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/10 transition-all duration-300 font-semibold"
                                    >
                                        Load More ({testimonials.length - visibleCount} remaining)
                                    </motion.button>
                                )}

                                {/* All Loaded Message */}
                                {visibleCount >= testimonials.length && testimonials.length > 4 && (
                                    <p className="text-center text-gray-500 text-sm py-4">
                                        All testimonials loaded ✓
                                    </p>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl -z-10"></div>
        </section>
    );
};

export default Testimonials;
